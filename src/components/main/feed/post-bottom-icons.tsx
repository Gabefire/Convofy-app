/// <reference types="vite-plugin-svgr/client" />
import type React from "react";
import { ReactComponent as ArrowUp } from "../../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../../assets/comment.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Edit } from "../../../assets/file-edit.svg";
import { POST_ACTION } from "./reducers/postsReducer";
import { usePostsDispatch } from "./context/postReducerContext";
import type postType from "./types/post";

interface postBottomIconsProps {
	post: postType;
	toggleEditPost: () => void;
}

// auth context for uid
const uid = "test";

export function PostBottomIcons({
	post,
	toggleEditPost,
}: postBottomIconsProps) {
	const dispatch = usePostsDispatch();

	const activatedUp = () => {
		if (post.liked) {
			return "red";
		}
		return "white";
	};

	const activatedDown = () => {
		if (!post.downVotes) {
			return "red";
		}
		return "white";
	};

	const getVoteValue = (post: postType): number => {
		let upVoteNum: number;
		if (post.upVotes !== undefined) {
			upVoteNum = post.upVotes;
		} else {
			upVoteNum = 0;
		}
		let downVoteNum: number;
		if (post.downVotes !== undefined) {
			downVoteNum = post.downVotes;
		} else {
			downVoteNum = 0;
		}
		return upVoteNum - downVoteNum;
	};

	const upVote = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// api to up vote post
		dispatch({
			type: POST_ACTION.UP_VOTE,
			payload: { post: post, uid: uid },
		});
	};

	const downVote = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// api to down vote post
		dispatch({
			type: POST_ACTION.DOWN_VOTE,
			payload: { post: post, uid: uid },
		});
	};

	const deletePost = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// api to delete post
		dispatch({
			type: POST_ACTION.DELETE_POST,
			payload: { post: post, uid: uid },
		});
	};

	return (
		<div className="bottom-icons">
			<div className="likes" data-testid="likes" id={`likes-${post.id}`}>
				<button
					type="button"
					className="up-vote-btn icon-btn"
					aria-label="up vote"
					onClick={upVote}
					id={`up-vote-btn-${post.id}`}
				>
					<ArrowUp fill={activatedUp()} className="arrow" />
				</button>
				{getVoteValue(post)}
				<button
					type="button"
					className="down-vote-btn icon-btn"
					id={`down-vote-btn-${post.id}`}
					onClick={downVote}
					aria-label="down vote"
				>
					<ArrowDown fill={activatedDown()} className="arrow" />
				</button>
			</div>
			<button type="button" className="icon-btn">
				<Comment fill={"white"} className="comment-icon" />
				{0}
			</button>
			{post.ownerUid === uid ? (
				<div className="auth-icons">
					<button type="button" className="icon-btn" onClick={deletePost}>
						<Delete fill={"white"} className="delete-icon" />
					</button>
					<button type="button" className="icon-btn" onClick={toggleEditPost}>
						<Edit fill={"white"} className="edit-icon" />
					</button>
				</div>
			) : null}
		</div>
	);
}
