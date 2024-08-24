/// <reference types="vite-plugin-svgr/client" />
import { useContext, useRef, useState } from "react";
import { SearchBox } from "./search";
import useClickOutside from "./hooks/useClickOutside";
import { ReactComponent as Magnify } from "../../../assets/magnify.svg";
import { ThemeContext } from "../../../global-contexts/themeContext";

interface MobileSearchType {
	cancelMobileSearch: () => void;
}

export function MobileSearch({ cancelMobileSearch }: MobileSearchType) {
	const { enabled } = useContext(ThemeContext);
	const searchBarRef = useRef<HTMLInputElement>(null);
	const searchBoxRef = useRef<HTMLDivElement>(null);
	const [displaySearchBox, setDisplaySearchBox] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// search box
	useClickOutside(
		searchBarRef,
		() => {
			setSearchTerm("");
			setDisplaySearchBox(false);
			cancelMobileSearch();
		},
		searchBoxRef,
	);
	return (
		<div className="flex items-center gap-2">
			<div
				className={`min-w-60 w-60 self-center ${displaySearchBox ? "rounded-t-2xl" : "rounded-2xl"} p-1 dark:bg-neutral-500 bg-neutral-300 h-10 flex relative`}
			>
				<Magnify
					className="size-4 ml-1 mr-1 self-center z-10 cursor-pointer"
					fill={enabled ? "white" : "black"}
					onClick={() => searchBarRef.current?.focus()}
				/>
				<input
					type="text"
					className="bg-inherit focus:outline-none focus:ring-0 w-52 z-10"
					ref={searchBarRef}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						if (e.target.value) {
							setDisplaySearchBox(true);
						} else if (!e.target.value) {
							setDisplaySearchBox(false);
							return;
						}
						setSearchTerm(e.target.value);
					}}
					value={searchTerm}
				/>
				{displaySearchBox ? (
					<div className="max-w-64 w-full absolute dark:bg-neutral-500 bg-neutral-300 right-1 left-0 top-5 min-h-32 z-0 mt-4 rounded-b-2xl max-h-80 overflow-y-scroll overflow-x-hidden">
						<SearchBox
							displaySearchBox={displaySearchBox}
							searchBoxRef={searchBoxRef}
							searchTerm={searchTerm}
						/>
					</div>
				) : null}
			</div>
			<button
				type="button"
				className="text-sm text-center"
				onClick={cancelMobileSearch}
			>
				Cancel
			</button>
		</div>
	);
}
