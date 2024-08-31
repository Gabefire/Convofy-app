import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { postType } from "../../feed/types/post";
import { generatePosts } from "../../../../test-util/posts";
import SearchBox from "../search";

describe("drop down component", () => {
	let messages: postType[];
	beforeEach(() => {
		messages = generatePosts();
	});
	it("renders forums", () => {
		const displaySearchBox = true;
		const searchBoxRef = vi.fn();
		const searchTerm = "test";
		render(
			<BrowserRouter>
				<SearchBox
					displaySearchBox={displaySearchBox}
					searchBoxRef={searchBoxRef}
					searchTerm={searchTerm}
				/>
			</BrowserRouter>,
		).debug();
		const forumElements = screen.getAllByRole("link");

		expect(forumElements.length).toBe(2);
		expect(forumElements[1].textContent).toBe("r/test1");
	});
});
