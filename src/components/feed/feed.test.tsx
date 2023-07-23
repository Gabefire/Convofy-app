import Feed from "./feed";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    messages = [message1];
  });

  it("renders feed component", async () => {
    const { container } = render(<Feed posts={messages} home={true} />);
    expect(container).toMatchSnapshot();
  });

  it("up vote button on screen", () => {
    render(<Feed posts={messages} home={true} />);
    const upVote = screen.getByRole("button", { name: "up vote" });
    expect(upVote).toBeInTheDocument();
  });
});
