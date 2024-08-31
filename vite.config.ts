/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigpath from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

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
			modules: {
				classNameStrategy: "non-scoped",
			},
		},
		coverage: {
			provider: "v8",
		},
		setupFiles: [resolve(__dirname, "src/test-util/setup.ts")],
	},
}));
