import type { UseFormSetError } from "react-hook-form";
import type { loginErrorType, signUpErrorType } from "../types/auth";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.API_URL;

export const signUp = async (signUpUser: {
	userName: string;
	password: string;
	email: string;
}): Promise<undefined | signUpErrorType[]> => {
	try {
		const result = await axios.post("/api/User/register", signUpUser);
		if (result.status !== 200) {
			throw new Error(result.data);
		}
	} catch (err) {
		if (typeof err === "string") {
			return [{ root: err }];
		}
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 409) {
				return [{ root: err.response?.data }];
			}
			return [{ root: "Something went wrong" }];
		}
	}
};

export const login = async (user: {
	email: string;
	password: string;
}): Promise<undefined | loginErrorType[]> => {
	try {
		const jwt = (await axios.post<string>("/api/User/login", user)).data;
		localStorage.setItem("auth", jwt);
	} catch (err) {
		if (typeof err === "string") {
			return [{ root: err }];
		}
		if (axios.isAxiosError(err)) {
			return [{ root: err.response?.data }];
		}
	}
};

export const validateResults = (
	results: signUpErrorType[] | loginErrorType[],
	setError: UseFormSetError<{
		userName: string;
		password: string;
		email: string;
		passwordConfirmation: string;
	}>,
) => {
	for (const obj in results) {
		const key = Object.keys(obj)[0];
		const value = Object.values(obj)[0];
		if (key === "userName") {
			setError("userName", { type: "manual", message: `${value}` });
		} else if (key === "password") {
			setError("password", { type: "manual", message: `${value}` });
		} else if (key === "email") {
			setError("email", { type: "manual", message: `${value}` });
		} else if (key === "root") {
			setError("root.serverError", { type: "404", message: `${value}` });
		} else if (key === "passwordConfirmation") {
			setError("passwordConfirmation", {
				type: "manual",
				message: `${value}`,
			});
		} else if (key === "email") {
			setError("email", { type: "manual", message: `${value}` });
		}
	}
};
