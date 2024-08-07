import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { forumDataType } from "../../forum/types/forumData";
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
