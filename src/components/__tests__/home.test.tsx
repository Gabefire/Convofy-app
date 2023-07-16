import { screen, render } from "@testing-library/react";
import { messageType } from "../forum";
import Messages from "../messages";
describe("messages home component", () => {
  it("displays messages from two forums", async () => {
    const message1: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "1",
      forum: "gabe",
    };
    const message2: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "2",
      forum: "gabe2",
    };
    const messages: messageType[] = [message1, message2];
    render(<Messages messages={messages} home={true} />);
    expect(document.querySelectorAll(".message").length).toBe(2);
  });
  it("shows two separate forum names with home", () => {
    expect(screen.getByRole("generic", { name: "gabe" })).toBeTruthy();
    expect(screen.getByRole("generic", { name: "gabe2" })).toBeTruthy();
  });
});
