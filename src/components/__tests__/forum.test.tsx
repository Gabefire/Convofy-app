import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateForum from "../create-forum";
import "@testing-library/jest-dom";

describe("Create forum component", () => {
  it("renders forum", () => {
    render(
      <BrowserRouter>
        <CreateForum />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox", {
      name: /forum name/i,
    }) as HTMLInputElement;
    user.type(input, "bob");
    expect(input.value).toBe("bob");
    const button = screen.getByRole("submit", { name: /submit button/i });
    user.click(button);
  });
});
