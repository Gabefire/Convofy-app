import { POST_ACTION, postsReducer } from "../reducers/postsReducer";
import { beforeEach, describe, expect, it } from "vitest";
import type postType from "../types/post";
import type { forumDataType } from "../../forum/types/forumData";

describe("bottom icons in message component", () => {
	let messages: postType[];
	beforeEach(() => {
		const owner1 = {
			displayName: "owner1",
			id: "1",
		};
		const owner2 = {
			displayName: "owner2",
			id: "2",
		};
		const forumData1: forumDataType = {
			color: "#ff0000",
			description: "Test description",
			following: true,
			title: "test1",
			owner: owner1,
		};
		const forumData2: forumDataType = {
			color: "#ff0000",
			description: "Test description",
			following: true,
			title: "test2",
			owner: owner2,
		};
		const message1: postType = {
			owner: owner2,
			content: "test",
			date: new Date(),
			title: "test",
			upVotes: 0,
			downVotes: 0,
			id: "1",
			forumData: forumData1,
		};
		const message2: postType = {
			owner: owner1,
			content: "test",
			date: new Date(),
			title: "test",
			upVotes: 0,
			downVotes: 0,
			id: "2",
			forumData: forumData2,
		};
		messages = [message1, message2];
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
