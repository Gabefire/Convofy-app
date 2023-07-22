import { screen, render } from "@testing-library/react";
import postType from "../../types/post";
import Feed from "../feed/feed";

describe("messages home component", () => {
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
    const messages: postType[] = [message1, message2];
    render(<Feed posts={messages} home={true} />);
  });

  it("displays messages from two forums", async () => {
    expect(document.querySelectorAll(".message").length).toBe(2);
  });

  it("shows two separate forum names with home", () => {
    expect(screen.getByTestId("gabe")).toBeInTheDocument;
    expect(screen.getByTestId("gabe2")).toBeInTheDocument;
  });

  /* it("click forum name switches url to forum", async () => {
    const user = userEvent.setup();
    expect(location.href).toBe("http://localhost/");
    const gabeForum = screen.getByTestId("gabe");
    await user.click(gabeForum);
    expect(location.href).toBe("http://localhost/r/gabe");
  }); */
});
