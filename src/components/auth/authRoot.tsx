import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import type { authUtilContextType } from "./types/auth";
import { TailSpin } from "react-loader-spinner";

export const AuthUtilContext: React.Context<authUtilContextType> =
	createContext({});

export default function AuthRoot() {
	const [loadingLogin, setLoadingLogin_] = useState(false);

	const setLoadingLogin = (loading: boolean) => {
		setLoadingLogin_(loading);
	};

	const authUtilContextValue: authUtilContextType = {
		setLoadingLogin,
	};
	return (
		<div className="flex flex-col">
			<AuthUtilContext.Provider value={authUtilContextValue}>
				{loadingLogin ? (
					<TailSpin
						height="40"
						width="40"
						color="white"
						ariaLabel="tail-spin-loading"
						wrapperClass="self-center top-1/3 absolute"
					/>
				) : (
					<Outlet />
				)}
			</AuthUtilContext.Provider>
		</div>
	);
}
