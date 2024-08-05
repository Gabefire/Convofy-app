import { beforeEach, describe, expect, it, vi } from "vitest";
import { generatePosts } from "../../../../test-util/posts";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Forum from "../forum";
import type { postType } from "../../feed/types/post";
import userEvent from "@testing-library/user-event";

describe("Forum component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});

	it("renders correctly", async () => {
		const tree = render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <Forum />} />
				</Routes>
			</MemoryRouter>,
		);

		expect(tree).toMatchFileSnapshot("./snapshots/forum");
	});

	it("shows correct title", () => {
		render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <Forum />} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.queryByText("r/test")).toBeInTheDocument();
	});

	it("click join button switches join button status", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={["/r/test"]}>
				<Routes>
					<Route path="r/:id" Component={() => <Forum />} />
				</Routes>
			</MemoryRouter>,
		);
		const joinedButton = screen.getByRole("button", { name: /Joined/ });

		await user.click(joinedButton);

		const joinButton = screen.getByRole("button", { name: /Join/ });

		expect(joinButton).toBeInTheDocument();
		expect(joinButton.style.background).toBe("rgb(30, 58, 138)");
	});
	it("icon is shown in forum data if present over just color", async () => {
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="r/:id" Component={() => <Forum />} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByRole("img", { name: /icon icon/ })).toBeInTheDocument();
	});
});
