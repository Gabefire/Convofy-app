import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainRoot from "../mainRoot";

describe("main root component", () => {
	it("renders main root", () => {
		const result = render(
			<BrowserRouter>
				<MainRoot />
			</BrowserRouter>,
		);

		expect(result.baseElement).toMatchFileSnapshot("./snapshot/mainRoot.html");
	});
});
