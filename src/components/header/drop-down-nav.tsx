import { NavLink } from "react-router-dom";

interface dropNavPropTypes {
  forums: string[];
  showDropDownNav: () => void;
}

export default function DropDownNav({
  forums,
  showDropDownNav,
}: dropNavPropTypes) {
  return (
    <ul id="drop-down-nav">
      {forums.map((name, index) => {
        return (
          <NavLink
            to={`r/${name}`}
            key={`${name}-${index}`}
            onClick={() => {
              showDropDownNav();
            }}
          >
            <li>{`r/${name}`}</li>
          </NavLink>
        );
      })}
    </ul>
  );
}
