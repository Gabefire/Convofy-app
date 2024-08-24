import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function MainRoot() {
	return (
		<>
			<Header />
			<div className="pt-14 flex flex-col self-center">
				<Outlet />
			</div>
		</>
	);
}
