/// <reference types="vite-plugin-svgr/client" />
import type React from "react";
import { ReactComponent as ArrowUp } from "../../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../../assets/comment.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Edit } from "../../../assets/file-edit.svg";
import { POST_ACTION } from "./reducers/postsReducer";
import { usePostsDispatch } from "./context/postReducerContext";
import type { postType } from "./types/post";

interface postBottomIconsProps {
	post: postType;
	toggleEditPost: () => void;
}

// auth context for uid
const uid = "1";

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
		if (post.liked === false) {
			return "red";
		}
		return "white";
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

	const roundThousands = (upVote: number, downVote: number) => {
		let votes = (upVote - downVote).toString();
		if (upVote - downVote >= 1000) {
			votes = (Math.round(upVote - downVote) / 1000).toString();
			return `${votes.slice(0, -4)}k`;
		}
		return votes;
	};

	return (
		<div className="flex gap-5">
			<div className="flex gap-2 items-center justify-center text-sm border rounded-2xl pt-1 pb-1 pl-2 pr-2 w-24 min-w-24 max-w-24 truncate">
				<button
					type="button"
					className="cursor-pointer p-0 m-0 size-4 min-w-4 max-w-4"
					aria-label="up vote"
					onClick={upVote}
				>
					<ArrowUp fill={activatedUp()} preserveAspectRatio="none" />
				</button>
				<div className="w-7 text-center">
					{roundThousands(post.upVotes, post.downVotes)}
				</div>
				<button
					type="button"
					className="cursor-pointer p-0 m-0 size-4 min-w-4 max-w-4"
					onClick={downVote}
					aria-label="down vote"
				>
					<ArrowDown fill={activatedDown()} preserveAspectRatio="none" />
				</button>
			</div>
			<button
				type="button"
				className="cursor-pointer flex gap-2 items-center border rounded-2xl pt-1 pb-1 pl-2 pr-2"
			>
				<Comment fill={"white"} className="size-4" />
				<div>{0}</div>
			</button>
			{post.owner.id === uid ? (
				<div className="flex gap-5 items-center justify-center text-sm border rounded-2xl pt-1 pb-1 pl-1 pr-1 w-20 truncate">
					<button type="button" onClick={deletePost}>
						<Delete fill={"white"} className="size-4" />
					</button>
					<button type="button" onClick={toggleEditPost}>
						<Edit fill={"white"} className="size-4" />
					</button>
				</div>
			) : null}
		</div>
	);
}
