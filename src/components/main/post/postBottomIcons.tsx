/// <reference types="vite-plugin-svgr/client" />
import type React from "react";
import { ReactComponent as ArrowUp } from "../../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../../assets/comment.svg";
import { POST_ACTION } from "./reducers/postsReducer";
import { usePostsDispatch } from "../feed/context/postReducerContext";
import type { postType } from "./types/post";
import { truncateNumber } from "../../../utli/truncate";
import { EditDelete } from "../shared/editDelete";
import { ThemeContext } from "../../../global-contexts/themeContext";
import { useContext } from "react";

interface postBottomIconsProps {
	post: postType;
	toggleEditPost: () => void;
}

// auth context for uid
const uid = "2";

export default function PostBottomIcons({
	post,
	toggleEditPost,
}: postBottomIconsProps) {
	const dispatch = usePostsDispatch();
	const { enabled } = useContext(ThemeContext);

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
			<button
				type="button"
				className="cursor-pointer flex gap-2 items-center rounded-2xl pt-1 pb-1 pl-2 pr-2 dark:border-white dark:border bg-neutral-300 dark:bg-transparent"
			>
				<Comment
					fill={enabled ? "white" : "black"}
					className="size-3 md:size-4"
				/>
				<div>{truncateNumber(post.comments)}</div>
			</button>
			<EditDelete
				deleteObj={deletePost}
				editObj={toggleEditPost}
				ownerUid={post.owner.id}
				type="post"
			/>
		</div>
	);
}
