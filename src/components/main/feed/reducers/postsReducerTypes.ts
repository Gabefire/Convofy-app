import type postType from "../types/post";

export type POSTS_ACTION_TYPE = {
	type: string;
	payload: {
		post: postType;
		uid: string; // id of the user who is trying to modify post
		newTitle?: string;
		newContent?: string;
	};
};
