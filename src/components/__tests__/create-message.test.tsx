import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateMessage from "../create-message";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("Create forum component", () => {
  it("submits forms", async () => {
    const mockFn = jest.fn((e: React.PointerEvent<HTMLInputElement>): any => {
      e.preventDefault();
    });
    render(
      <BrowserRouter>
        <CreateMessage createMessage={mockFn} />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /Submit/i });
    await act(() => user.click(button) as any);
    expect(mockFn).toHaveBeenCalled();
  });
});
