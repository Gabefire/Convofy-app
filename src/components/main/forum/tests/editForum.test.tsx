import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditForum from "../editForum";

describe("Forum component", () => {
	it("renders correctly", async () => {
		const tree = render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <EditForum />} />
				</Routes>
			</MemoryRouter>,
		);
		expect(tree).toMatchFileSnapshot("./snapshots/editForum");
	});
	// TODO more tests once API is implemented
});
