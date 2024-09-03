import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CreatePost from "../createPost";

describe("Forum component", () => {
	it("renders correctly", async () => {
		const tree = render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <CreatePost />} />
				</Routes>
			</MemoryRouter>,
		);
		expect(tree).toMatchFileSnapshot("./snapshots/createPost.html");
	});
	// TODO more tests once API is implemented
});
