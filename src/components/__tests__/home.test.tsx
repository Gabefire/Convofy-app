import { render } from "@testing-library/react";
import { messageType } from "../forum";
import Messages from "../messages";

describe("home component", () => {
  it("displays messages from two forums", async () => {
    const message1: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "12",
      forum: "gabe",
    };
    const message2: messageType = {
      from: "gabe",
      content: "test",
      date: new Date(),
      title: "test",
      votes: 0,
      id: "12",
      forum: "gabe2",
    };
    const messages: messageType[] = [message1, message2];
    render(<Messages messages={messages} home={true} />);
  });
});
