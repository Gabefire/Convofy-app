/// <reference types="vite" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigpath from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [react(), tsconfigpath(), svgr()],
	preview: {
		host: "0.0.0.0",
		port: 8080,
	},
});
