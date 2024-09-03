import { describe, expect, it, vi } from "vitest";
import { createIcon, textColorBasedOnBackground } from "../createIcon";

describe("textColorBasedOnBackground function", () => {
	it("returns #fff on dark background", () => {
		expect(textColorBasedOnBackground("#533d37")).toBe("#fff");
	});

	it("returns #000 on light background", () => {
		expect(textColorBasedOnBackground("#ff3300")).toBe("#000");
	});
});

describe("createIcon function", () => {
	global.URL.createObjectURL = vi.fn();

	it("returns an image if Blob is passed into function", async () => {
		const img = await fetch("https://picsum.photos/id/237/200/300").then((r) =>
			r.blob(),
		);

		expect(createIcon(img, "red")).toMatchInlineSnapshot(`
			<img
			  alt="forum-icon"
			  className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			/>
		`);
	});
	it("returns a default svg if null is passed into function", async () => {
		expect(createIcon(null, "red")).toMatchInlineSnapshot(`
			<SvgDefaultForum
			  className="size-52 p-10 absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			  fill="#fff"
			  style={
			    {
			      "background": "red",
			    }
			  }
			/>
		`);
	});
});
