import { beforeEach, describe, expect, it } from "vitest";
import { generatePosts } from "../../../../test-util/posts";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../home";
import type { postType } from "../../feed/types/post";

describe("Post component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});

	it("renders correctly", () => {
		const tree = render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>,
		);

		expect(tree).toMatchFileSnapshot("./snapshots/home");
	});
});
