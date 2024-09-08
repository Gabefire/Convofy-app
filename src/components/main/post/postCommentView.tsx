import { useReducer, useRef, useState } from "react";
import { POST_ACTION, postsReducer } from "./reducers/postsReducer";
import Post from "./post";
import { PostsDispatchContext } from "../feed/context/postReducerContext";
import type { postType } from "./types/post";
import useClickOutside from "../header/hooks/useClickOutside";
import type { commentType } from "../comment/types/comment";
import CommentForm from "../comment/commentForm";
import CommentFeed from "../comment/commentFeed";
import { useNavigate } from "react-router-dom";

interface PostCommentViewType {
	post: postType;
}

export default function PostCommentView({ post }: PostCommentViewType) {
	const [posts, dispatch] = useReducer(postsReducer, [post]);
	const [showCommentTextArea, setShowCommentTextArea] = useState(false);
	const addCommentTextAreaRef = useRef<HTMLDivElement>(null);
	const navigator = useNavigate();

	if (posts.length === 0) {
		navigator(-1);
	}

	// comment box
	useClickOutside(addCommentTextAreaRef, () => {
		setShowCommentTextArea(false);
	});

	const addComment = (
		parentComment: commentType | null,
		newComment: commentType,
	) => {
		dispatch({
			type: POST_ACTION.ADD_COMMENT,
			payload: { post: post, uid: "2" },
		});
		console.log(parentComment, newComment);
	};

	return (
		<div className="flex flex-col flex-1 dark:text-white mt-4 max-w-2xl w-screen md:w-11/12 justify-items-center self-center">
			<PostsDispatchContext.Provider value={dispatch}>
				<div className="dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border pl-5 pr-5 pb-3 pt-3 rounded-xl w-full">
					<Post showForumInfo={false} post={posts[0]} />
				</div>
				<div className="mt-2">
					{!showCommentTextArea ? (
						<button
							type="button"
							className="rounded-xl h-10 w-full border border-neutral-400 dark:border-neutral-500"
							onClick={() => setShowCommentTextArea(true)}
						>
							Add a comment
						</button>
					) : (
						<div ref={addCommentTextAreaRef}>
							<CommentForm
								parentComment={null}
								toggleView={() => setShowCommentTextArea(false)}
								addComment={addComment}
							/>
						</div>
					)}
				</div>
				<div className="md:pl-0 pl-2 pt-2 pr-2">
					<CommentFeed />
				</div>
			</PostsDispatchContext.Provider>
		</div>
	);
}
