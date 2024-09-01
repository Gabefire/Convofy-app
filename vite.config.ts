/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigpath from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve } from "node:path";
import postcss, { plugin } from "postcss";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig(() => ({
	base: "/",
	plugins: [react(), tsconfigpath(), svgr()],
	preview: {
		host: "0.0.0.0",
		port: 8080,
	},
	test: {
		globals: true,
		environment: "jsdom",
		testTimeout: 2000,
		css: {
			postcss: {
				plugin: [tailwindcss()],
			},
		},
		coverage: {
			provider: "v8",
			exclude: [
				"src/main.tsx",
				"postcss.config.js",
				"tailwind.config.ts",
				"vite.config.ts",
			],
		},
		setupFiles: [resolve(__dirname, "src/test-util/setup.ts")],
	},
}));
