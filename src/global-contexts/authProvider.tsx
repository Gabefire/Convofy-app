import axios from "axios";
import "react";
import {
	type ReactElement,
	createContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { authContextType } from "../components/auth/types/auth";
import type { user } from "../components/auth/types/user";

export const AuthContext: React.Context<authContextType> = createContext({
	token: null as string | null,
	setToken: (token: string | null): void => {
		token;
	},
	user: null as user | null,
	setUser: (user: user | null): void => {
		user;
	},
});

export default function AuthProvider({ children }: { children: ReactElement }) {
	const [token, setToken_] = useState(localStorage.getItem("auth"));
	const [user, setUser_] = useState<user | null>(
		JSON.parse(localStorage.getItem("user") ?? "null"),
	);

	const setToken = (newToken: string | null) => {
		setToken_(newToken);
	};

	const setUser = (user: user | null) => {
		setUser_(user);
	};

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			localStorage.setItem("auth", token);
		} else {
			axios.defaults.headers.common.Authorization = undefined;
			localStorage.removeItem("auth");
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: This will run each render
	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			token,
			setToken,
		}),
		[token, user],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
