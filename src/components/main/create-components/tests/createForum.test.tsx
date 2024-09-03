import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CreateForum from "../createForum";

describe("Forum component", () => {
	it("renders correctly", async () => {
		const tree = render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <CreateForum />} />
				</Routes>
			</MemoryRouter>,
		);
		expect(tree).toMatchFileSnapshot("./snapshots/createForum.html");
	});
	// TODO more tests once API is implemented
});
