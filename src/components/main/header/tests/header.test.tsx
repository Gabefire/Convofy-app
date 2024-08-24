import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { postType } from "../../feed/types/post";
import { generatePosts } from "../../../../test-util/posts";
import Header from "../header";

describe("drop down component", () => {
	let messages: postType[];
	beforeEach(() => {
		messages = generatePosts();
	});
	it("renders forums", () => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		const forumElements = document.querySelectorAll("li");
		expect(forumElements.length).toBe(3);
		expect(forumElements[0].textContent).toBe("r/test1");
	});
});
