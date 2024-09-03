import { beforeEach, describe, expect, it } from "vitest";
import type { postType } from "../../post/types/post";
import { generatePosts } from "../../../../test-util/posts";
import { POST_ACTION, postsReducer } from "../../post/reducers/postsReducer";

describe("Reducer for post management", () => {
	let messages: postType[];
	beforeEach(() => {
		messages = generatePosts();
	});

	it("clicking up arrow increase value of vote and decreases it", () => {
		const initialState = messages;
		const updatedAction = {
			type: POST_ACTION.UP_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		let updatedState = postsReducer(initialState, updatedAction);

		expect(updatedState[1].upVotes).toBe(1);
		updatedState = postsReducer(updatedState, updatedAction);
		expect(updatedState[1].upVotes).toBe(0);
	});

	it("clicking down arrow decrease value of vote and increases it", () => {
		const initialState = messages;
		const updatedAction = {
			type: POST_ACTION.DOWN_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		let updatedState = postsReducer(initialState, updatedAction);

		expect(updatedState[1].downVotes).toBe(1);
		updatedState = postsReducer(updatedState, updatedAction);
		expect(updatedState[1].downVotes).toBe(0);
	});

	it("switches to decrease and removes increase to post", () => {
		const initialState = messages;
		let updatedAction = {
			type: POST_ACTION.UP_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		let updatedState = postsReducer(initialState, updatedAction);

		expect(updatedState[1].upVotes).toBe(1);
		updatedAction = {
			type: POST_ACTION.DOWN_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		updatedState = postsReducer(updatedState, updatedAction);
		expect(updatedState[1].downVotes).toBe(1);
		expect(updatedState[1].upVotes).toBe(0);
	});

	it("switches to increase and removes decrease to post", () => {
		const initialState = messages;
		let updatedAction = {
			type: POST_ACTION.DOWN_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		let updatedState = postsReducer(initialState, updatedAction);

		expect(updatedState[1].downVotes).toBe(1);
		updatedAction = {
			type: POST_ACTION.UP_VOTE,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		updatedState = postsReducer(updatedState, updatedAction);
		expect(updatedState[1].upVotes).toBe(1);
		expect(updatedState[1].downVotes).toBe(0);
	});

	it("deletes post", () => {
		const initialState = messages;
		const updatedAction = {
			type: POST_ACTION.DELETE_POST,
			payload: { uid: "1", id: "2", post: messages[1] },
		};
		const updatedState = postsReducer(initialState, updatedAction);
		expect(updatedState.length).toBe(2);
	});

	it("edit post", () => {
		const initialState = messages;
		const updatedAction = {
			type: POST_ACTION.EDIT_POST,
			payload: {
				uid: "1",
				id: "2",
				newTitle: "new title",
				newContent: "new content",
				post: messages[1],
			},
		};
		const updatedState = postsReducer(initialState, updatedAction);
		expect(updatedState[1].title).toBe("new title");
		expect(updatedState[1].content).toBe("new content");
	});
	it("adds post", () => {
		const initialState = messages;
		const new_post: postType = { ...messages[0], id: "3" };
		const updatedAction = {
			type: POST_ACTION.ADD_POST,
			payload: {
				uid: "1",
				post: new_post,
			},
		};

		expect(initialState.length).toBe(3);
		const updatedState = postsReducer(initialState, updatedAction);
		expect(updatedState.length).toBe(4);
		expect(updatedState[3]).toBe(new_post);
	});
	it("unable to edit post not ours", () => {
		const initialState = messages;
		const updatedAction = {
			type: POST_ACTION.EDIT_POST,
			payload: {
				uid: "not correct id",
				id: "2",
				newTitle: "new title",
				newContent: "new content",
				post: messages[0],
			},
		};
		const updatedState = postsReducer(initialState, updatedAction);
		expect(updatedState[0].title).toBe("test");
		expect(updatedState[0].content).toBe("test");
	});
	it("returns default if no action matches", () => {
		const initialState = messages;
		const updatedAction = {
			type: "nothing",
			payload: {
				uid: "not correct id",
				id: "2",
				newTitle: "new title",
				newContent: "new content",
				post: messages[0],
			},
		};
		const updatedState = postsReducer(initialState, updatedAction);
		expect(updatedState).toBe(initialState);
	});
});
