import { addDays, addMonths, addSeconds, addYears } from "date-fns";
import dateConverter from "../date";
import addHours from "date-fns/addHours";
import addMinutes from "date-fns/addMinutes";
import { describe, expect, it } from "vitest";

describe("date function", () => {
	it("converts something from 30 secs to now", () => {
		let currentDate = new Date();
		currentDate = addSeconds(currentDate, -30);
		expect(dateConverter(currentDate)).toBe("Now");
	});
	it("converts something 1 hour ago to hour", () => {
		let currentDate = new Date();
		currentDate = addHours(currentDate, -1);
		expect(dateConverter(currentDate)).toBe("1 hour ago");
	});
	it("converts something 2 hour ago to hours", () => {
		let currentDate = new Date();
		currentDate = addHours(currentDate, -2);
		expect(dateConverter(currentDate)).toBe("2 hours ago");
	});
	it("converts something 1 minute ago to minute", () => {
		let currentDate = new Date();
		currentDate = addMinutes(currentDate, -1);
		expect(dateConverter(currentDate)).toBe("1 minute ago");
	});
	it("converts something 30 minutes ago to minutes", () => {
		let currentDate = new Date();
		currentDate = addMinutes(currentDate, -30);
		expect(dateConverter(currentDate)).toBe("30 minutes ago");
	});
	it("converts something a day ago to day", () => {
		let currentDate = new Date();
		currentDate = addDays(currentDate, -1);
		expect(dateConverter(currentDate)).toBe("1 day ago");
	});
	it("converts something multiple days ago to days", () => {
		let currentDate = new Date();
		currentDate = addDays(currentDate, -2);
		expect(dateConverter(currentDate)).toBe("2 days ago");
	});
	it("converts something a year ago to 1 year", () => {
		let currentDate = new Date();
		currentDate = addYears(currentDate, -1);
		expect(dateConverter(currentDate)).toBe("1 year ago");
	});
	it("converts something 2 years ago to years", () => {
		let currentDate = new Date();
		currentDate = addYears(currentDate, -2);
		expect(dateConverter(currentDate)).toBe("2 years ago");
	});
	it("converts something a month ago to month", () => {
		let currentDate = new Date();
		currentDate = addMonths(currentDate, -1);
		expect(dateConverter(currentDate)).toBe("1 month ago");
	});
	it("converts something 2 months ago to months", () => {
		let currentDate = new Date();
		currentDate = addMonths(currentDate, -2);
		expect(dateConverter(currentDate)).toBe("2 months ago");
	});
});
