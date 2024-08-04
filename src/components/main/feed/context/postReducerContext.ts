import { createContext, useContext } from "react";
import type React from "react";
import type { POSTS_ACTION_TYPE } from "../reducers/postsReducerTypes";

export const PostsDispatchContext = createContext();

export function usePostsDispatch() {
	return useContext(PostsDispatchContext);
}
