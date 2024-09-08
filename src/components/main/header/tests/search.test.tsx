import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SearchBox from "../search";
import Header from "../header";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../../../global-contexts/themeContext";
import { act } from "react";

describe("search component", () => {
	it("shows no results if nothing matches search term", async () => {
		render(
			<BrowserRouter>
				<SearchBox displaySearchBox={true} searchTerm={""} />
			</BrowserRouter>,
		);

		expect(screen.getByText("No Results")).toBeInTheDocument();
	});
	it("show nothing if displaySearchBox is false", () => {
		const results = render(
			<BrowserRouter>
				<SearchBox displaySearchBox={false} searchTerm={""} />
			</BrowserRouter>,
		);

		expect(results.baseElement).toMatchInlineSnapshot(`
			<body>
			  <div />
			</body>
		`);
	});
	it("show nothing if displaySearchBox is false", () => {
		const results = render(
			<BrowserRouter>
				<ThemeProvider>
					<SearchBox displaySearchBox={false} searchTerm={""} />
				</ThemeProvider>
			</BrowserRouter>,
		);

		expect(results.baseElement).toMatchInlineSnapshot(`
			<body>
			  <div />
			</body>
		`);
	});
	it("changes tail spin loading icon on theme change", () => {
		// TODO rewrite this test it does not actually test what is intended. I cant force the tail spinner without API integration
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

		render(
			<BrowserRouter>
				<ThemeProvider>
					<SearchBox displaySearchBox={true} searchTerm={"test"} />
				</ThemeProvider>
			</BrowserRouter>,
		);

		expect(document.documentElement.classList.contains("dark")).toBeTruthy();
	});
});

describe("header drop down search component", () => {
	it("renders forums", () => {
		const displaySearchBox = true;
		const searchBoxRef = vi.fn();
		const searchTerm = "test2";
		render(
			<BrowserRouter>
				<SearchBox
					displaySearchBox={displaySearchBox}
					searchBoxRef={searchBoxRef}
					searchTerm={searchTerm}
				/>
			</BrowserRouter>,
		);
		const forumElements = screen.getAllByRole("link");

		expect(forumElements.length).toBe(2);
		expect(forumElements[1].textContent).toBe("r/test1");
	});
	it("when clicking outside search box it collapses", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
		await act(() => user.type(searchInput, "test"));
		expect(searchInput.value).toBe("test");
		expect(screen.getByText(/r\/test1/)).toBeInTheDocument();
		await act(() => user.click(screen.getByText(/Convofy/)));
		expect(searchInput.value).toBe("");
		expect(screen.queryByText(/r\/test1/)).not.toBeInTheDocument();
	});
	it("collapses if text is removed", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>,
		);
		const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
		await act(() => user.type(searchInput, "test"));
		expect(searchInput.value).toBe("test");
		expect(screen.getByText(/r\/test1/)).toBeInTheDocument();
		await act(() => user.clear(searchInput));
		expect(searchInput.value).toBe("");
		expect(screen.queryByText(/r\/test1/)).not.toBeInTheDocument();
	});
});
