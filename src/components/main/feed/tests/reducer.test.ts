import { POST_ACTION, postsReducer } from "../reducers/postsReducer";
import { beforeEach, describe, expect, it } from "vitest";
import type { postType } from "../types/post";
import { generatePosts } from "./posts";

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
		expect(updatedState.length).toBe(1);
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
});
