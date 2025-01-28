import { useContext } from "react";
import { AuthContext } from "../../../global-contexts/authProvider";
import type {
	loginErrorType,
	loginUserDtoType,
	loginUserType,
	signUpErrorType,
	signUpUserType,
} from "./../types/auth";
import axios from "axios";

export const useProvideAuth = () => {
	const { setToken, setUser } = useContext(AuthContext);
	axios.defaults.baseURL = import.meta.env.VITE_API_URL;

	const login = async (
		loginUser: loginUserType,
	): Promise<undefined | loginErrorType[]> => {
		try {
			const userDto = (
				await axios.post<loginUserDtoType>("/api/User/login", loginUser)
			).data;
			setToken(userDto.token);
			setUser({
				displayName: userDto.userName,
				id: userDto.id,
				color: userDto.color ?? "#000000",
				fileLink: userDto.fileLink ?? undefined,
			});
			axios.defaults.headers.common.Authorization = `Bearer ${userDto.token}`;
		} catch (err) {
			if (typeof err === "string") {
				return [{ root: err }];
			}
			if (axios.isAxiosError(err)) {
				return [{ root: err.response?.data }];
			}
		}
	};

	const signUp = async (
		signUpUser: signUpUserType,
	): Promise<undefined | signUpErrorType[]> => {
		try {
			await axios.post("/api/User/register", signUpUser);
			const loginErrors = await login({
				email: signUpUser.email,
				password: signUpUser.password,
			});
			if (loginErrors) {
				return loginErrors;
			}
		} catch (err) {
			if (typeof err === "string") {
				return [{ root: err }];
			}
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 409) {
					return [{ root: err.response?.data }];
				}
				return [{ root: "Bad Connection" }];
			}
		}
	};

	const editProfile = async (
		signUpUser: signUpUserType,
	): Promise<undefined | signUpErrorType[]> => {
		try {
			await axios.put("/api/User/edit", signUpUser);
			const loginErrors = await login({
				email: signUpUser.email,
				password: signUpUser.password,
			});
			if (loginErrors) {
				return loginErrors;
			}
		} catch (err) {
			if (typeof err === "string") {
				return [{ root: err }];
			}
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 409) {
					return [{ root: err.response?.data }];
				}
				return [{ root: "Bad Connection" }];
			}
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	return {
		login,
		signUp,
		logout,
		editProfile,
	};
};

export default useProvideAuth;
