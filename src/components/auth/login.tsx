import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./login.css";

export default function Login() {
	const navigate = useNavigate();

	const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const userEmail = document.getElementById("username") as HTMLInputElement;
		const userPassword = document.getElementById(
			"password",
		) as HTMLInputElement;
		try {
			const userCredentials = await signInWithEmailAndPassword(
				userEmail.value,
				userPassword.value,
			);
			console.log(userCredentials);
			navigate("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	const signUp = async (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const userEmail = document.getElementById(
			"username-sign-up",
		) as HTMLInputElement;
		const userPassword = document.getElementById(
			"password-sign-up",
		) as HTMLInputElement;
		const displayName = document.getElementById(
			"name-sign-up",
		) as HTMLInputElement;
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				userEmail.value,
				userPassword.value,
			);
			if (auth.currentUser !== null) {
				await updateProfile(auth.currentUser, {
					displayName: displayName.value,
				});
			}
			console.log(userCredentials);
			navigate("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<form action="na" id="login-form">
			<label htmlFor="username">
				Username:
				<input type="email" id="username" />
			</label>
			<label htmlFor="password">
				Password:
				<input type="password" id="password" />
			</label>
			<div id="error"></div>
			<button id="login-btn" onClick={login}>
				Login
			</button>
			<button id="sign-up-btn" onClick={changeLoginToSignUp}>
				Sign Up
			</button>
			<button id="try-me-btn" onClick={google}>
				Google Login
			</button>
		</form>
	);
}
