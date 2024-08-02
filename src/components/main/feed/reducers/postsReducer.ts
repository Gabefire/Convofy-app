import type postType from "../types/post";
import type { POSTS_ACTION_TYPE } from "./postsReducerTypes";

export const POST_ACTION = {
	ADD_POST: "add-post",
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
		case POST_ACTION.ADD_POST:
			posts.push(action.payload.post);
			return posts;
		case POST_ACTION.DELETE_POST:
			return posts.filter((post) => {
				if (
					post.owner.id === action.payload.uid &&
					post.id === action.payload.post.id
				) {
					return false;
				}
				return true;
			});

		case POST_ACTION.RESTART:
			return postsInitialState;

		case POST_ACTION.UP_VOTE:
			return posts.map((post) => {
				if (post.id === action.payload.post.id) {
					if (post.liked === false) {
						return {
							...post,
							upVotes: post.upVotes + 1,
							downVotes: post.downVotes - 1,
							liked: true,
						};
					}
					if (post.liked === true) {
						return {
							...post,
							upVotes: post.upVotes - 1,
							liked: undefined,
						};
					}
					return {
						...post,
						upVotes: post.upVotes + 1,
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
							return {
								...post,
								upVotes: post.upVotes - 1,
								downVotes: post.downVotes + 1,
								liked: false,
							};
						}
						if (post.liked === false) {
							return {
								...post,
								downVotes: post.downVotes - 1,
								liked: undefined,
							};
						}
						return {
							...post,
							downVotes: post.downVotes + 1,
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
					post.owner.id === action.payload.uid &&
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
