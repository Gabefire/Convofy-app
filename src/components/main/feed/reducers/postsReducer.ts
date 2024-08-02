import type postType from "../types/post";
import type { POSTS_ACTION_TYPE } from "./postsReducerTypes";

export const POST_ACTION = {
	ADD_POSTS: "add-post",
	UP_VOTE: "up-vote",
	DOWN_VOTE: "down-vote",
	DELETE_POST: "delete-post",
	EDIT_POST: "edit-post",
	RESTART: "restart",
};

export const postsInitialState = [] as postType[];

export function postsReducer(
	posts: postType[],
	action: POSTS_ACTION_TYPE,
): postType[] {
	switch (action.type) {
		case POST_ACTION.ADD_POSTS:
			posts.push(action.payload.post);
			return posts;
		case POST_ACTION.DELETE_POST:
			return posts.filter((post) => {
				if (post.ownerUid === action.payload.uid) {
					post.id !== action.payload.post.id;
				}
			});

		case POST_ACTION.RESTART:
			return postsInitialState;

		case POST_ACTION.UP_VOTE:
			return posts.map((post) => {
				if (post.id === action.payload.post.id) {
					if (post.liked === false) {
						post.upVotes += 1;
						post.downVotes -= 1;
						return {
							...post,
							liked: true,
						};
					}
					if (post.liked === true) {
						post.upVotes -= 1;
						return {
							...post,
							liked: undefined,
						};
					}
					post.upVotes += 1;
					return {
						...post,
						liked: true,
					};
				}
				return post;
			});

		case POST_ACTION.DOWN_VOTE:
			if (action.payload !== undefined) {
				return posts.map((post) => {
					if (post.id === action.payload.post.id) {
						if (post.liked === true) {
							post.downVotes += 1;
							post.upVotes -= 1;
							return {
								...post,
								liked: false,
							};
						}
						if (post.liked === false) {
							post.downVotes -= 1;
							return {
								...post,
								liked: undefined,
							};
						}
						post.downVotes -= 1;
						return {
							...post,
							liked: false,
						};
					}
					return post;
				});
			}
			return posts;
		case POST_ACTION.EDIT_POST:
			return posts.map((post) => {
				if (
					post.id === action.payload.post.id &&
					post.ownerUid === action.payload.uid &&
					action.payload.newTitle &&
					action.payload.newContent
				) {
					return {
						...post,
						title: action.payload.newTitle,
						content: action.payload.newContent,
					};
				}
				return post;
			});
		default:
			return posts;
	}
}
