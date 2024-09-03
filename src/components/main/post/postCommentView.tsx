import { useReducer } from "react";
import { postsReducer } from "./reducers/postsReducer";
import Post from "./post";
import { PostsDispatchContext } from "../feed/context/postReducerContext";
import type { postType } from "./types/post";

interface PostCommentViewType {
	post: postType;
}

export default function PostCommentView({ post }: PostCommentViewType) {
	const [posts, dispatch] = useReducer(postsReducer, [post]);

	return (
		<div className="flex flex-col flex-1 dark:text-white mt-4">
			<PostsDispatchContext.Provider value={dispatch}>
				<div className="dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border pl-5 pr-5 pb-3 pt-3 max-w-2xl w-screen md:w-11/12 rounded-xl">
					<Post showForumInfo={false} post={posts[0]} />
				</div>
			</PostsDispatchContext.Provider>
		</div>
	);
}
