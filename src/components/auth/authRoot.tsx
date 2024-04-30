import { Outlet } from "react-router-dom";
import "./auth.css";
import { useEffect } from "react";

const NO_REDIRECT = ["/edit-profile"];

export default function AuthRoot() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      localStorage.getItem("auth") &&
      !NO_REDIRECT.includes(location.pathname)
    ) {
      navigate("/main");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="content">
      <div id="login-page">
        <h1 className="title-login">Reddit Clone</h1>
        <Outlet />
      </div>
    </div>
  );
}
