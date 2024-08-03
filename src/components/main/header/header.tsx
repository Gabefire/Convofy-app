import DropDownNav from "./drop-down-nav";
import { Link } from "react-router-dom";
import "./header.css";
import mainIcon from "../../../assets/reddit-circle.svg";
import chevronDown from "../../../assets/chevron-down.svg";
import home from "../../../assets/home.svg";
import magnify from "../../../assets/magnify.svg";
import { useState } from "react";
import type { forumDataType } from "../forum/types/forumData";

export default function Header() {
	const [showDropDownNav, setShowDropDownNav] = useState(false as boolean);
	const [forums, setForums] = useState([] as forumDataType[]);

	const hideNav = (): void => {
		setShowDropDownNav(false);
	};

	return (
		<div id="header">
			<div id="title">
				<img src={mainIcon} alt="site symbol" />
				<h3>Fake Forum</h3>
			</div>

			<div id="search-items">
				<div id="drop-down-menu">
					<div id="icons">
						<Link to="/r" onClick={hideNav}>
							<div id="home-icons">
								<img src={home} alt="home icon" />
								<div>Home</div>
							</div>
						</Link>
						<img
							src={chevronDown}
							alt="expand menu"
							onKeyDown={() => {
								setShowDropDownNav(!showDropDownNav);
							}}
						/>
					</div>
					{showDropDownNav ? (
						<DropDownNav forums={forums} showDropDownNav={hideNav} />
					) : null}
				</div>
				<div id="search-bar">
					<img alt="search icon" src={magnify} />
					<input type="text" />
				</div>
			</div>

			<div id="user-icons">
				<Link to="/create-forum">
					<div id="add-forum" onKeyDown={hideNav}>
						+
					</div>
				</Link>
				<Link to="/login" className="header-link">
					<button type="button" id="login-btn" onClick={hideNav}>
						Login
					</button>
				</Link>
			</div>
		</div>
	);
}
