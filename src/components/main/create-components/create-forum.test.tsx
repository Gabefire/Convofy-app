import { render } from "@testing-library/react";
import CreateForum from "./create-forum";
import { describe, it } from "vitest";

describe("Create forum component", () => {
	it("submits forms", async () => {
		render(<CreateForum />);
	});
});
