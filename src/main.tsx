import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import AuthRoot from "./components/auth/authRoot.tsx";
import Login from "./components/auth/login.tsx";
import SignUp from "./components/auth/signUp.tsx";
import CreateForum from "./components/create-components/create-forum.tsx";
import Forum from "./components/forum/forum.tsx";
import CreatePost from "./components/create-components/create-post.tsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoot />,
    children: [
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "edit-profile", element: <EditProfile /> },
    ],
  },
  {
    path: "/r",
    element: <MainRoot />,
    children: [
      { index: true, element: <Home /> },
      { path: "create-forum", element: <CreateForum /> },
      { path: ":id", element: <Forum /> },
      { path: ":id/create-post", element: <CreatePost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
