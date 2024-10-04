import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Header from "../header";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../../../global-contexts/themeContext";
import { act } from "react";

describe("header component", () => {
	it("login button switches url location", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="/r/:id" Component={() => <Header />} />
					<Route path="/auth/login" Component={() => <h1>test123</h1>} />
				</Routes>
			</MemoryRouter>,
		);
		await act(() => user.click(screen.getByRole("button", { name: /Login/ })));
		expect(
			screen.getByRole("heading", { name: "test123" }),
		).toBeInTheDocument();
	});
	it("home button switches url location", async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={["/r/icon"]}>
				<Routes>
					<Route path="/r/:id" Component={() => <Header />} />
					<Route path="/" Component={() => <h1>test123</h1>} />
				</Routes>
			</MemoryRouter>,
		);
		await act(() =>
			user.click(screen.getByRole("button", { name: "site symbol" })),
		);
		expect(
			screen.getByRole("heading", { name: "test123" }),
		).toBeInTheDocument();
	});
	it("toggles icons for theme", async () => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: query === "(prefers-color-scheme: dark)",
				media: query,
				onchange: null,
				addListener: vi.fn(), // deprecated
				removeListener: vi.fn(), // deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<ThemeProvider>
					<Header />
				</ThemeProvider>
			</BrowserRouter>,
		);

		expect(
			screen.getByRole("button", { name: "toggle theme" }).innerHTML,
		).toMatchInlineSnapshot(
			`"<svg xmlns="http://www.w3.org/2000/svg" viewBox="2.44 2.07 26.99 27" class="size-6" fill="white"><path d="M16.48 29.07a14.09 14.09 0 0 1-5.82-26.9A1 1 0 0 1 12 3.5a12.11 12.11 0 0 0 2.4 13.61 12.11 12.11 0 0 0 13.6 2.4 1 1 0 0 1 1.33 1.33 14.15 14.15 0 0 1-12.82 8.23zM9.25 5.33A13 13 0 0 0 8 6.42a12.12 12.12 0 0 0 0 17.12 11.94 11.94 0 0 0 8.52 3.53 12.1 12.1 0 0 0 8.57-3.56 13 13 0 0 0 1.09-1.26A14.14 14.14 0 0 1 13 18.53a14.14 14.14 0 0 1-3.75-13.2z"></path></svg>"`,
		);

		await act(() =>
			user.click(screen.getByRole("button", { name: "toggle theme" })),
		);

		expect(
			screen.getByRole("button", { name: "toggle theme" }).innerHTML,
		).toMatchInlineSnapshot(
			`"<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" class="size-6" fill="black"><path d="M7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5zm5-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm-1 15v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-2 0zm10-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zM3 13h1a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm14.657-5.657a1 1 0 0 0 .707-.293l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 .707 1.707zM5.636 16.95l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414zm11.314 0a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 0zM5.636 7.05A1 1 0 0 0 7.05 5.636l-.707-.707a1 1 0 0 0-1.414 1.414z"></path></svg>"`,
		);
	});
	it("focuses on search when magnify glass is clicked", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		await act(() =>
			user.click(
				screen.getByRole("button", { name: "icon to focus on search" }),
			),
		);

		expect(screen.getByRole("searchbox")).toHaveFocus();
	});
});

describe("header mobile support", () => {
	it("shows mobile icons", () => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		expect(screen.getByRole("button", { name: "mobile search" })).toBeVisible();
	});
	it("drop down menu toggles", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		const mobileIcon = screen.getByRole("button", { name: "mobile search" });
		await act(() => user.click(mobileIcon));

		const cancelButton = screen.getByRole("button", { name: "Cancel" });
		expect(cancelButton).toBeInTheDocument();

		await act(() => user.click(cancelButton));

		expect(cancelButton).not.toBeInTheDocument();
	});
});
