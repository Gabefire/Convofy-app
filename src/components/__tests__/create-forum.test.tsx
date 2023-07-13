import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateForum from "../create-forum";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("Create forum component", () => {
  it("submits forms", async () => {
    const mockFn = jest.fn();
    render(
      <BrowserRouter>
        <CreateForum createForum={mockFn} />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /Submit/i });
    await act(() => user.click(button) as any);
    expect(mockFn).toHaveBeenCalled();
  });
});
