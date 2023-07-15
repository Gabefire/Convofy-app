import { Link } from "react-router-dom";

interface dropNavPropTypes {
  forums: string[];
}

export default function DropDownNav({ forums }: dropNavPropTypes) {
  return (
    <ul id="drop-down-nav">
      {forums.map((name, index) => {
        return (
          <li key={`${name}-${index}`}>
            <Link to={`/r/${name}`}>{`r/${name}`}</Link>
          </li>
        );
      })}
    </ul>
  );
}
