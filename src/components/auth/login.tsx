/// <reference types="vite-plugin-svgr/client" />
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useProvideAuth from "./hooks/useProvideAuth";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthUtilContext } from "./authRoot";
import { ReactComponent as Google } from "../../assets/google.svg";

const loginFormSchema = z.object({
	email: z.string().min(1, "Email is required").max(100),
	password: z.string().min(1, "Password is required"),
});

type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<loginFormSchemaType>({ resolver: zodResolver(loginFormSchema) });

	const { login } = useProvideAuth();
	const navigate = useNavigate();
	const { setLoadingLogin } = useContext(AuthUtilContext);

	const onSubmit: SubmitHandler<loginFormSchemaType> = async (user) => {
		try {
			if (setLoadingLogin) {
				setLoadingLogin(true);
			}
			const results = await login(user);
			if (Array.isArray(results)) {
				for (const obj in results) {
					const key = Object.keys(obj)[0];
					const value = Object.values(obj)[0];
					if (key === "email") {
						setError("email", { type: "manual", message: `${value}` });
					} else if (key === "password") {
						setError("password", { type: "manual", message: `${value}` });
					} else if (key === "root") {
						setError("root.serverError", { type: "404", message: `${value}` });
					}
				}
			} else {
				navigate("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (setLoadingLogin) {
				setLoadingLogin(false);
			}
		}
	};
	return (
		<form
			className="flex flex-col flex-1 dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border p-4 w-80  dark:text-white absolute top-1/3 gap-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="self-center font-medium">Login</h1>
			<button
				type="button"
				className="flex gap-3 p-2 bg-[#F2F2F2] dark:bg-[#131314] font-[##1F1F1F] dark:font-[#E3E3E3] font-['Roboto Medium'] justify-center rounded-md"
			>
				<Google width={"20"} className="self-center" />
				<span className="self-center">Sign in with Google</span>
			</button>
			<label htmlFor="email" className="flex flex-col gap-1">
				Email:
				<input
					aria-label="email"
					type="text"
					id="email"
					placeholder="Enter email"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1"
					{...register("email")}
					autoComplete="current-email"
				/>
				{errors.email && (
					<span aria-live="polite">
						<span className="text-red-700">*</span>
						{errors.email?.message}
					</span>
				)}
			</label>
			<label htmlFor="password" className="flex flex-col gap-1">
				Password:
				<input
					type="password"
					id="password"
					placeholder="Enter Password"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1 rounded-sm"
					autoComplete="current-password"
					{...register("password")}
				/>
				{errors.password && (
					<span aria-live="polite">
						<span className="text-red-700">*</span>
						{errors.password?.message}
					</span>
				)}
			</label>
			<span className="text-xs pl-1">
				Don't have an account?{" "}
				<span>
					<Link to={"/auth/sign-up"} className="cursor-pointer text-blue-600">
						Click here to sign up.
					</Link>
				</span>
			</span>
			<button
				type="submit"
				disabled={isSubmitting}
				className="h-6 dark:text-white dark:border-white dark:border pb-6 pt-0 bg-neutral-300 dark:bg-inherit text-black"
			>
				Login
			</button>
			<button
				type="button"
				className="h-6 dark:text-white dark:border-white dark:border pb-6 pt-0 bg-neutral-300 dark:bg-inherit text-black"
				onClick={() => {
					navigate(-1);
				}}
			>
				Back
			</button>
			{errors.root && (
				<span>
					<span className="text-red-700">*</span>
					{errors.root?.serverError.message}
				</span>
			)}
		</form>
	);
}
