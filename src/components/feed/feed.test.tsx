import Feed from "./feed";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import postType from "../../types/post";

describe("feed component", () => {
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
  it("mock useEffect", () => {
    const mockFn = jest.fn();
    jest.spyOn(React, "useEffect").mockImplementation(mockFn);
    render(<Feed posts={messages} home={true} />);
  });
});
