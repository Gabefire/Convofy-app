import postType from "../post";
import { ACTION, reducer } from "../feed";

describe("bottom icons in message component", () => {
  let messages: postType[];
  beforeEach(() => {
    const message1: postType = {
      uid: "123",
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      upVotes: [],
      downVotes: [],
      id: "1",
      forum: "gabe",
      iconURL: null,
    };
    const message2: postType = {
      uid: "1234",
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      upVotes: [],
      downVotes: [],
      id: "2",
      forum: "gabe2",
      iconURL: null,
    };
    messages = [message1, message2];
  });

  it("clicking up arrow increase value of vote and decreases it", () => {
    const initialState = messages;
    const updatedAction = {
      type: ACTION.UP_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    let updatedState = reducer(initialState, updatedAction);

    expect(updatedState[1].upVotes.length).toBe(1);
    updatedState = reducer(updatedState, updatedAction);
    expect(updatedState[1].upVotes.length).toBe(0);
  });

  it("clicking down arrow decrease value of vote and increases it", () => {
    const initialState = messages;
    const updatedAction = {
      type: ACTION.DOWN_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    let updatedState = reducer(initialState, updatedAction);

    expect(updatedState[1].downVotes.length).toBe(1);
    updatedState = reducer(updatedState, updatedAction);
    expect(updatedState[1].downVotes.length).toBe(0);
  });

  it("switches to decrease and removes increase to post", () => {
    const initialState = messages;
    let updatedAction = {
      type: ACTION.UP_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    let updatedState = reducer(initialState, updatedAction);

    expect(updatedState[1].upVotes.length).toBe(1);
    updatedAction = {
      type: ACTION.DOWN_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    updatedState = reducer(updatedState, updatedAction);
    expect(updatedState[1].downVotes.length).toBe(1);
    expect(updatedState[1].upVotes.length).toBe(0);
  });

  it("switches to increase and removes decrease to post", () => {
    const initialState = messages;
    let updatedAction = {
      type: ACTION.DOWN_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    let updatedState = reducer(initialState, updatedAction);

    expect(updatedState[1].downVotes.length).toBe(1);
    updatedAction = {
      type: ACTION.UP_VOTE,
      payload: { uid: "testuser", id: "2" },
    };
    updatedState = reducer(updatedState, updatedAction);
    expect(updatedState[1].upVotes.length).toBe(1);
    expect(updatedState[1].downVotes.length).toBe(0);
  });

  it("deletes post", () => {
    const initialState = messages;
    let updatedAction = {
      type: ACTION.DELETE_POST,
      payload: { uid: "testuser", id: "2" },
    };
    let updatedState = reducer(initialState, updatedAction);
    expect(updatedState.length).toBe(1);
  });

  it("edit post", () => {
    const initialState = messages;
    let updatedAction = {
      type: ACTION.EDIT_POST,
      payload: {
        uid: "testuser",
        id: "2",
        title: "new title",
        content: "new content",
      },
    };
    let updatedState = reducer(initialState, updatedAction);
    expect(updatedState[1].title).toBe("new title");
    expect(updatedState[1].content).toBe("new content");
  });
});
