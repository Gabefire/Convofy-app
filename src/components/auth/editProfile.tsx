import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useProvideAuth from "./hooks/useProvideAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthUtilContext } from "./authRoot";
import { validateResults } from "./util/authUtil";

const signUpFormSchema = z
	.object({
		userName: z
			.string()
			.min(1, "Username is required")
			.max(100)
			.or(z.literal("")),
		email: z.string().email("Invalid email").or(z.literal("")),
		password: z.string().min(1, "Password is required").or(z.literal("")),
		passwordConfirmation: z.string().or(z.literal("")),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Passwords do not match",
	});

export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export default function EditProfile() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<signUpFormSchemaType>({
		resolver: zodResolver(signUpFormSchema),
	});

	const navigate = useNavigate();
	const { editProfile } = useProvideAuth();
	const { setLoadingLogin } = useContext(AuthUtilContext);

	const onSubmit: SubmitHandler<signUpFormSchemaType> = async (user) => {
		try {
			if (setLoadingLogin) setLoadingLogin(true);
			const signUpResults = await editProfile(user);
			if (Array.isArray(signUpResults) && signUpResults.length > 0) {
				validateResults(signUpResults, setError);
			}
			navigate(-1);
		} catch (error) {
			console.error(error);
		} finally {
			if (setLoadingLogin) setLoadingLogin(false);
		}
	};

	return (
		<form
			className="flex flex-col flex-1 dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border p-4 w-80  dark:text-white absolute top-1/3 gap-5"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="self-center font-medium">Edit Profile</h1>
			<label htmlFor="username" className="flex flex-col gap-1">
				New Username:
				<input
					aria-label="username"
					type="text"
					id="username"
					placeholder="Enter Username"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1"
					{...register("userName")}
				/>
				<span aria-live="polite" />
				{errors.userName && (
					<span className="text-red-700" aria-live="polite">
						{errors.userName?.message}
					</span>
				)}
			</label>
			<label htmlFor="email" className="flex flex-col gap-1">
				New Email:
				<input
					aria-label="email"
					type="email"
					id="email"
					placeholder="Enter Email"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1"
					{...register("email")}
				/>
				<span aria-live="polite" />
				{errors.email !== undefined && (
					<span className="text-red-700" aria-live="polite">
						{errors.email?.message}
					</span>
				)}
			</label>
			<label htmlFor="password" className="flex flex-col gap-1">
				New Password:
				<input
					type="password"
					id="password"
					placeholder="Enter Password"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1"
					autoComplete="new-password"
					{...register("password")}
				/>
				<span aria-live="polite" />
				{errors.password && (
					<span className="text-red-700" aria-live="polite">
						{errors.password?.message}
					</span>
				)}
			</label>
			<label htmlFor="password-confirmation" className="flex flex-col gap-1">
				Confirm Password:
				<input
					type="password"
					id="password-confirmation"
					placeholder="Confirm Password"
					className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base h-7 dark:border-gray-200 border-gray-400 border p-1"
					autoComplete="new-password"
					{...register("passwordConfirmation")}
				/>
				<span aria-live="polite" />
				{errors.passwordConfirmation && (
					<span className="text-red-700" aria-live="polite">
						{errors.passwordConfirmation?.message}
					</span>
				)}
			</label>
			{errors.root && (
				<div className="text-red-700">{errors.root?.serverError.message}</div>
			)}
			<button
				type="submit"
				disabled={isSubmitting}
				className="h-6 dark:text-white dark:border-white dark:border pb-6 pt-0 bg-neutral-300 dark:bg-inherit text-black"
			>
				Submit
			</button>
			<button
				type="button"
				className="h-6 dark:text-white dark:border-white dark:border pb-6 pt-0 bg-neutral-300 dark:bg-inherit text-black"
				onClick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				Back
			</button>
		</form>
	);
}
