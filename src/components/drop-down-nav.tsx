import { Link } from "react-router-dom";

interface dropNavPropTypes {
  forums: string[];
}

export default function DropDownNav({ forums }: dropNavPropTypes) {
  return (
    <ul id="drop-down-nav">
      {forums.map((name, index) => {
        return (
          <Link to={`/r/${name}`} key={`${name}-${index}`}>
            <li>{`r/${name}`}</li>
          </Link>
        );
      })}
    </ul>
  );
}
