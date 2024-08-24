import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{tsx,ts}"],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: "selector",
} satisfies Config;
