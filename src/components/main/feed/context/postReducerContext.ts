import { createContext, useContext } from "react";
import type React from "react";
import type { POSTS_ACTION_TYPE } from "../reducers/postsReducerTypes";

export const PostsDispatchContext = createContext((() => {
	return;
}) as React.Dispatch<POSTS_ACTION_TYPE>);

export function usePostsDispatch() {
	return useContext(PostsDispatchContext);
}
