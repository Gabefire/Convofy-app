import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropDownNav from "./drop-down-nav";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { forumDataType } from "../forum/types/forumData";

describe("drop down component", () => {
	const owner1 = {
		displayName: "owner1",
		id: "1",
	};
	const owner2 = {
		displayName: "owner2",
		id: "2",
	};
	const forumData1: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test1",
		owner: owner1,
	};
	const forumData2: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test2",
		owner: owner2,
	};
	it("renders forums", () => {
		const showNav = vi.fn();
		render(
			<BrowserRouter>
				<DropDownNav
					forums={[forumData1, forumData2]}
					showDropDownNav={showNav}
				/>
			</BrowserRouter>,
		);
		const forumElements = document.querySelectorAll("li");
		expect(forumElements.length).toBe(3);
		expect(forumElements[0].textContent).toBe("r/test1");
	});
	it("switches url", async () => {
		const showNav = vi.fn();
		render(
			<BrowserRouter>
				<DropDownNav
					forums={[forumData1, forumData2]}
					showDropDownNav={showNav}
				/>
			</BrowserRouter>,
		);
		const user = userEvent.setup();
		const forumElements = document.querySelectorAll("li");
		expect(location.href).toBe("http://localhost/");
		await user.click(forumElements[0]);
		expect(location.href).toBe("http://localhost/r/test1");
	});
});
