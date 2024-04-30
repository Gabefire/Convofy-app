import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import "./login.css";
import { FirebaseApp } from "../../utli/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const app = useContext(FirebaseApp);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const changeLoginToSignUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
  };

  const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userEmail = document.getElementById("username") as HTMLInputElement;
    const userPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value
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
      "username-sign-up"
    ) as HTMLInputElement;
    const userPassword = document.getElementById(
      "password-sign-up"
    ) as HTMLInputElement;
    const displayName = document.getElementById(
      "name-sign-up"
    ) as HTMLInputElement;
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value
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

  const provider = new GoogleAuthProvider();

  const google = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const googleResults = await signInWithPopup(auth, provider);
      console.log(googleResults);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const loginPage = () => {
    return (
      <>
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
      </>
    );
  };

  const signUpPage = () => {
    return (
      <>
        <form action="na" id="sign-up-form">
          <label htmlFor="name">
            Display Name:
            <input type="text" id="name-sign-up" />
          </label>
          <label htmlFor="username">
            Username:
            <input type="text" id="username-sign-up" className="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="text" id="password-sign-up" className="password" />
          </label>
          <div id="error"></div>
          <button id="sign-up-btn" onClick={signUp}>
            Sign Up
          </button>
          <button id="go-back-btn" onClick={changeLoginToSignUp}>
            Go Back
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="content">
      <div id="login-page">
        <h1 className="title-login">Reddit Clone</h1>
        {showSignUp ? signUpPage() : loginPage()}
      </div>
    </div>
  );
}
