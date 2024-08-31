import { type ReactElement, createContext, useEffect, useState } from "react";
import { boolean } from "zod";

interface themeContextType {
	enabled: boolean;
	toggleDarkMode: (option: boolean) => void;
}

export const ThemeContext: React.Context<themeContextType> = createContext(
	{} as themeContextType,
);

export function ThemeProvider({ children }: { children: ReactElement }) {
	const [darkMode, setDarkMode] = useState<boolean | undefined>();
	const prefersDarkMode = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	let enabled = darkMode ?? prefersDarkMode;

	useEffect(() => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) && prefersDarkMode)
		) {
			document.documentElement.classList.add("dark");
			setDarkMode(true);
			enabled = false;
		} else {
			document.documentElement.classList.remove("dark");
			setDarkMode(false);
			enabled = true;
		}
	}, [enabled, prefersDarkMode]);

	const toggleDarkMode = (option: boolean) => {
		if (option) {
			localStorage.theme = "dark";
			setDarkMode(true);
		} else {
			localStorage.theme = "light";
			setDarkMode(false);
		}
	};

	const contextValue = { enabled, toggleDarkMode };

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}
