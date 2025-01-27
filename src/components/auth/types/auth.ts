import type { user } from "./user";

export type signUpUserType = {
	userName: string;
	password: string;
	passwordConfirmation: string;
	email: string;
};

export type loginUserType = {
	email: string;
	password: string;
};

export type loginUserDtoType = {
	userName: string;
	token: string;
	id: string;
	profilePicLink: string | null;
	color: string;
};

export type loginErrorType = {
	userName?: string;
	password?: string;
	root?: string;
};

export type signUpErrorType = {
	userName?: string;
	password?: string;
	passwordConfirmation?: string;
	email?: string;
	root?: string;
};

export type authContextType = {
	user: user | null;
	setUser: (user: user | null) => void;
	token: string | null;
	setToken: (token: string | null) => void;
};

export type authUtilContextType = {
	setLoadingLogin?: (loading: boolean) => void;
};
