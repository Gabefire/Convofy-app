import { screen, render } from "@testing-library/react";
import postType from "../../types/post";
import Feed from "../feed/feed";
import userEvent from "@testing-library/user-event";

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

  it("click forum name switches url to forum", async () => {
    const user = userEvent.setup();
    expect(location.href).toBe("http://localhost/");
    const gabeForum = screen.getByTestId("gabe");
    await user.click(gabeForum);
    expect(location.href).toBe("http://localhost/r/gabe");
  });
});

describe("bottom icons in message component", () => {
  beforeEach(() => {
    const message1: postType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      upVotes: [],
      downVotes: [],
      id: "1",
      forum: "gabe",
      uid: "12",
      iconURL: null,
    };
    const messages: postType[] = [message1];
    render(<Feed posts={messages} home={true} />);
  });
  it("clicking up arrow increase value of vote", async () => {
    const user = userEvent.setup();
    const upArrow = screen.getByRole("button", { name: "up vote" });
    await user.click(upArrow);
    expect(screen.getByTestId("likes").textContent).toBe("1");
  });

  it("clicking down arrow decrease value of vote", async () => {
    const user = userEvent.setup();
    const upArrow = screen.getByRole("button", { name: "up vote" });
    await user.click(upArrow);
    expect(screen.getByTestId("likes").textContent).toBe("-1");
  });

  it("can not click up arrow more then one time", async () => {
    const user = userEvent.setup();
    const upArrow = screen.getByRole("button", { name: "up vote" });
    await user.click(upArrow);
    await user.click(upArrow);
    expect(screen.getByTestId("likes").textContent).toBe("1");
  });

  it("can not click down arrow more then one time", async () => {
    const user = userEvent.setup();
    const upArrow = screen.getByRole("button", { name: "up vote" });
    await user.click(upArrow);
    await user.click(upArrow);
    expect(screen.getByTestId("likes").textContent).toBe("1");
  });
});
