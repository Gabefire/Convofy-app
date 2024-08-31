import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ThemeContext, ThemeProvider } from "../themeContext";
import Header from "../../components/main/header/header";
import userEvent from "@testing-library/user-event";

describe("Theme provider component", () => {
	it("renders themeProvider", () => {
		const tree = render(
			<BrowserRouter>
				<ThemeProvider>
					<Header />
				</ThemeProvider>
			</BrowserRouter>,
		);
		expect(tree).toMatchFileSnapshot("./snapshots/ThemeProvider.html");
	});
	it("toggles dark and light theme when header is clicked", async () => {
		const user = userEvent.setup();
		localStorage.setItem("theme", "dark");
		render(
			<BrowserRouter>
				<ThemeProvider>
					<Header />
				</ThemeProvider>
			</BrowserRouter>,
		);

		const themeButton = screen.getByRole("button", { name: "toggle theme" });

		await user.click(themeButton);

		expect(localStorage.theme).toBe("light");
		expect(document.documentElement.classList.contains("dark")).not.toBe(true);

		await user.click(themeButton);

		expect(localStorage.theme).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
	it("dark mode on by default if window has matchMedia", async () => {
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
		localStorage.clear();

		// Render the component
		render(
			<ThemeProvider>
				<div>Test Child</div>
			</ThemeProvider>,
		);

		// Assert that the enabled value in the context is false
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
	it("light mode on by default if window has matchMedia that results in false", async () => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: query === "(prefers-color-scheme: light)",
				media: query,
				onchange: null,
				addListener: vi.fn(), // deprecated
				removeListener: vi.fn(), // deprecated
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
		localStorage.clear();

		// Render the component
		render(
			<ThemeProvider>
				<div>Test Child</div>
			</ThemeProvider>,
		);

		// Assert that the enabled value in the context is false
		expect(document.documentElement.classList.contains("dark")).not.toBe(true);
	});
});

describe("theme context", () => {
	it("provides expected context obj to child", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(
			<BrowserRouter>
				<ThemeContext.Provider value={{ enabled: true, toggleDarkMode: mock }}>
					<Header />
				</ThemeContext.Provider>
			</BrowserRouter>,
		);

		const themeButton = screen.getByRole("button", { name: "toggle theme" });

		await user.click(themeButton);
		expect(mock).toBeCalledTimes(1);
	});
});
