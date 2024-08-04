import { truncateNumber } from "../truncate";
import { describe, expect, it } from "vitest";

describe("truncate function", () => {
	it("less then 1000 render number", () => {
		expect(truncateNumber(999)).toBe("999");
	});
	it("over 1000 less then 1000000 end in k", () => {
		expect(truncateNumber(10678)).toBe("10.7k");
	});
	it("over 1000000 to end in m", () => {
		expect(truncateNumber(1300004)).toBe("1.3m");
	});
});
