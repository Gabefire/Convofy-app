import { screen, render } from "@testing-library/react";
import { messageType } from "../forum";
import Messages from "../messages";
import userEvent from "@testing-library/user-event";

describe("messages home component", () => {
  beforeEach(() => {
    const message1: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "1",
      forum: "gabe",
      iconURL: undefined,
    };
    const message2: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "2",
      forum: "gabe2",
      iconURL: undefined,
    };
    const messages: messageType[] = [message1, message2];
    render(<Messages messages={messages} home={true} />);
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
    const message1: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "1",
      forum: "gabe",
      iconURL: undefined,
    };
    const messages: messageType[] = [message1];
    render(<Messages messages={messages} home={true} />);
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
