/// <reference types="vite-plugin-svgr/client" />
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Magnify } from "../../../assets/magnify.svg";
import mainIcon from "../../../assets/reddit-circle.svg";

export default function Header() {
	const navigate = useNavigate();
	return (
		<div className="fixed top-0 flex bg-neutral-700 w-full justify-between h-14 min-h-14 text-white pl-2 pr-2 items-center">
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="cursor-pointer"
					onClick={() => navigate("/r")}
				>
					<img src={mainIcon} alt="site symbol" className="size-10" />
				</button>
				<h1 className="text-2xl">Convofy</h1>
			</div>
			<div className="min-w-64 w-64 sm:flex self-center rounded-2xl p-1 bg-neutral-500 h-10 hidden">
				<Magnify className="size-6 self-center" />
				<input
					type="text"
					className="bg-inherit focus:outline-none focus:ring-0"
				/>
			</div>

			<div className="flex items-center sm:gap-4 gap-2">
				<Magnify className="size-7" fill="white" />
				<Link to="/create-forum">
					<button
						type="button"
						className="cursor-pointer flex items-center gap-1 rounded-2xl pl-2 pr-2 leading-normal text-center
						sm:text-lg text-3xl border-none border sm:border-solid"
						title="Create forum"
					>
						<span className="text-center">+</span>
						<span className="sm:block hidden">Create</span>
					</button>
				</Link>
				<Link to="/login">
					<button
						type="button"
						className="cursor-pointer flex items-center gap-1  border border-red-600 rounded-2xl pl-2 pr-2 bg-red-600 leading-normal text-center sm:text-lg text-base"
					>
						Login
					</button>
				</Link>
			</div>
		</div>
	);
}
