import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
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
      <button
        id="go-back-btn"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </form>
  );
}
