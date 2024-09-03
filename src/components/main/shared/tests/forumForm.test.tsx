import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import ForumForm from "../forumForm";
import { defaultForumDataUndefinedFile } from "../../../../test-util/forumData";

describe("Forum form component", () => {
	it("renders correctly", async () => {
		const tree = render(
			<BrowserRouter>
				<ForumForm componentTitle={""} submitAction={vi.fn()} />
			</BrowserRouter>,
		);
		expect(tree.baseElement).toMatchFileSnapshot("./snapshots/forumForm.html");
	});
	it("calls submit action when form is submitted", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();
		await act(() =>
			render(
				<BrowserRouter>
					<ForumForm
						componentTitle={"test"}
						submitAction={mock}
						defaultForum={defaultForumDataUndefinedFile}
					/>
				</BrowserRouter>,
			),
		);
		await act(() => user.click(screen.getByRole("button", { name: "Submit" })));
		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledWith(defaultForumDataUndefinedFile);
	});
});
