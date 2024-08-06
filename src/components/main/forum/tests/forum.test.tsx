import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Forum from "../forum";
import userEvent from "@testing-library/user-event";

describe("Forum component", () => {
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
	it("icon is shown in forum data if present over just color", () => {
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="r/:id" Component={() => <Forum />} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByRole("img", { name: /icon icon/ })).toBeInTheDocument();
	});
	it("deletes forum (switches url location)", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="/r/:id" Component={() => <Forum />} />
					<Route path="/r" Component={() => <h1>test123</h1>} />
				</Routes>
			</MemoryRouter>,
		);

		const deleteButton = screen.getAllByRole("button", {
			name: /delete forum/,
		})[0];
		await user.click(deleteButton);

		expect(
			screen.getByRole("heading", { name: "test123" }),
		).toBeInTheDocument();
	});
	it("edit forum (switches url location)", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="/r/:id" Component={() => <Forum />} />
					<Route path="/r" Component={() => <h1>test123</h1>} />
				</Routes>
			</MemoryRouter>,
		);

		const deleteButton = screen.getAllByRole("button", {
			name: /edit forum/,
		})[0];
		await user.click(deleteButton);

		expect(
			screen.getByRole("heading", { name: "test123" }),
		).toBeInTheDocument();
	});
});
