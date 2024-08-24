/// <reference types="vite-plugin-svgr/client" />
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Magnify } from "../../../assets/magnify.svg";
import { ReactComponent as Moon } from "../../../assets/moon.svg";
import { ReactComponent as Sun } from "../../../assets/sun.svg";
import mainIcon from "../../../assets/reddit-circle.svg";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../../global-contexts/themeContext";
import { SearchBox } from "./search";
import useClickOutside from "./hooks/useClickOutside";
import { MobileSearch } from "./mobileSearch";

export default function Header() {
	const navigate = useNavigate();
	const { enabled, toggleDarkMode } = useContext(ThemeContext);
	const searchBarRef = useRef<HTMLInputElement>(null);
	const searchBoxRef = useRef<HTMLDivElement>(null);
	const [displaySearchBox, setDisplaySearchBox] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// mobile support
	const [showMobileSearch, setShowMobileSearch] = useState(false);
	const cancelMobileSearch = () => {
		setShowMobileSearch(false);
	};

	// search box
	useClickOutside(
		searchBarRef,
		() => {
			setSearchTerm("");
			setDisplaySearchBox(false);
		},
		searchBoxRef,
	);

	return (
		<div className="fixed top-0 flex flex-1 dark:bg-neutral-700 bg-white w-screen justify-between h-14 min-h-14 dark:text-white pl-5 pr-5 items-center border-b-neutral-400 border-b dark:border-none">
			{showMobileSearch ? (
				<MobileSearch cancelMobileSearch={cancelMobileSearch} />
			) : (
				<>
					<div className="flex items-center sm:gap-2 gap-1">
						<button
							type="button"
							className="cursor-pointer"
							onClick={() => navigate("/r")}
						>
							<img
								src={mainIcon}
								alt="site symbol"
								className="sm:size-10 size-8"
							/>
						</button>
						<h1 className="sm:text-2xl dark:text-white text-red-600 font-bold">
							Convofy
						</h1>
					</div>
					<div
						className={`min-w-64 w-64 sm:flex self-center ${displaySearchBox ? "rounded-t-2xl" : "rounded-2xl"} p-1 dark:bg-neutral-500 bg-neutral-300 h-10 hidden relative`}
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

					<div className="flex items-center sm:gap-4 gap-2">
						{/* mobile support */}
						<Magnify
							className="size-5 sm:hidden items-center cursor-pointer"
							fill={enabled ? "white" : "black"}
							onClick={() => setShowMobileSearch(true)}
						/>
						<Link to="/r/create-forum">
							<button
								type="button"
								className="cursor-pointer flex items-center gap-1 rounded-2xl pl-2 pr-2 leading-normal text-center
						sm:text-lg text-3xl sm:border-solid dark:border-white dark:border sm:bg-neutral-300 dark:bg-transparent border-none"
								title="Create forum"
							>
								<span className="text-center sm:pb-0 pb-1">+</span>
								<span className="sm:block hidden">Create</span>
							</button>
						</Link>
						<div className="items-center flex">
							<button type="button" onClick={() => toggleDarkMode(!enabled)}>
								{enabled ? (
									<Moon className="size-6" fill="white" />
								) : (
									<Sun className="size-6" fill="black" />
								)}
							</button>
						</div>
						<Link to="/login">
							<button
								type="button"
								className="cursor-pointer flex items-center gap-1  border border-red-600 rounded-2xl pl-2 pr-2 bg-red-600 leading-normal text-white text-center sm:text-lg text-base"
							>
								Login
							</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
