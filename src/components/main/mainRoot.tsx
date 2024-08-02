import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function MainRoot() {
	return (
		<div className="content">
			<Header />
			<Outlet />
		</div>
	);
}
