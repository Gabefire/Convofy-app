/// <reference types="vite-plugin-svgr/client" />
import type React from "react";
import { ReactComponent as ArrowUp } from "../../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../../assets/comment.svg";
import { POST_ACTION } from "./reducers/postsReducer";
import { usePostsDispatch } from "../feed/context/postReducerContext";
import type { postType } from "./types/post";
import { truncateNumber } from "../../../utli/truncate";
import { EditDelete, EditDeleteEnum } from "../shared/editDelete";
import { ThemeContext } from "../../../global-contexts/themeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../global-contexts/authProvider";

interface postBottomIconsProps {
	post: postType;
	toggleEditPost: () => void;
}

export default function PostBottomIcons({
	post,
	toggleEditPost,
}: postBottomIconsProps) {
	const dispatch = usePostsDispatch();
	const { enabled } = useContext(ThemeContext);
	const { user } = useContext(AuthContext);
	const activatedUp = () => {
		if (post.liked) {
			return "red";
		}
		return enabled ? "white" : "black";
	};

	const activatedDown = () => {
		if (post.liked === false) {
			return "red";
		}
		return enabled ? "white" : "black";
	};

	const upVote = async (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await axios.post(`/api/Post/${post.id}/up-vote`);
		dispatch({
			type: POST_ACTION.UP_VOTE,
			payload: { post: post, uid: user?.id ?? "" },
		});
	};

	const downVote = async (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await axios.post(`/api/Post/${post.id}/down-vote`);
		dispatch({
			type: POST_ACTION.DOWN_VOTE,
			payload: { post: post, uid: user?.id ?? "" },
		});
	};

	const deletePost = async (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await axios.delete(`/api/Post/${post.id}`);
		dispatch({
			type: POST_ACTION.DELETE_POST,
			payload: { post: post, uid: user?.id ?? "" },
		});
	};

	return (
		<div className="flex gap-5 text-xs md:text-sm">
			<div className="flex gap-2 items-center justify-around rounded-2xl pt-1 pb-1 pl-2 pr-2 truncate dark:border-white dark:border bg-neutral-300 dark:bg-transparent">
				<button
					type="button"
					className="cursor-pointer p-0 m-0 min-w-4 max-w-4 flex justify-center"
					aria-label="up vote"
					onClick={upVote}
				>
					<ArrowUp
						fill={activatedUp()}
						preserveAspectRatio="none"
						className="size-3 md:size-4"
					/>
				</button>
				<div className="text-center">
					{truncateNumber(post.upVotes - post.downVotes)}
				</div>
				<button
					type="button"
					className="cursor-pointer p-0 m-0 min-w-4 max-w-4 flex justify-center"
					onClick={downVote}
					aria-label="down vote"
				>
					<ArrowDown
						fill={activatedDown()}
						preserveAspectRatio="none"
						className="size-3 md:size-4"
					/>
				</button>
			</div>
			<Link
				to={`/r/${post.forumData?.title}/${post.id}`}
				className="cursor-pointer flex gap-2 items-center rounded-2xl pt-1 pb-1 pl-2 pr-2 dark:border-white dark:border bg-neutral-300 dark:bg-transparent"
			>
				<Comment
					fill={enabled ? "white" : "black"}
					className="size-3 md:size-4"
				/>
				<div>{truncateNumber(post.comments)}</div>
			</Link>
			<EditDelete
				deleteObj={deletePost}
				editObj={toggleEditPost}
				ownerUid={post.owner.id}
				type={EditDeleteEnum.Post}
			/>
		</div>
	);
}
