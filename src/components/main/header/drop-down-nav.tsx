import { NavLink } from "react-router-dom";
import type { forumDataType } from "../forum/types/forumData";

interface dropNavPropTypes {
	forums: forumDataType[];
	showDropDownNav: () => void;
}

export default function DropDownNav({
	forums,
	showDropDownNav,
}: dropNavPropTypes) {
	return (
		<ul id="drop-down-nav">
			{forums.map((forum) => {
				return (
					<NavLink
						to={`r/${forum.title}`}
						key={`${forum.title}`}
						onClick={() => {
							showDropDownNav();
						}}
					>
						<li>{`r/${forum.title}`}</li>
					</NavLink>
				);
			})}
		</ul>
	);
}
