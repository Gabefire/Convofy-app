import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import CreateForum from "./components/main/create-components/createForum.tsx";
import Forum from "./components/main/forum/forum.tsx";
import CreatePost from "./components/main/create-components/createPost.tsx";
import Home from "./components/main/home/home.tsx";
import MainRoot from "./components/main/mainRoot.tsx";
import "./index.css";
import { ThemeProvider } from "./global-contexts/themeContext.tsx";
import EditForum from "./components/main/forum/editForum.tsx";
import PostHandler from "./components/main/post/postHandler.tsx";
import Login from "./components/auth/login.tsx";
import AuthRoot from "./components/auth/authRoot.tsx";
import SignUp from "./components/auth/signUp.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainRoot />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "r/",
				children: [
					{ index: true, element: <Forum /> },
					{ path: "create-forum", element: <CreateForum /> },
					{
						path: ":id/",
						children: [
							{ index: true, element: <Forum /> },
							{ path: "create-post", element: <CreatePost /> },
							{ path: "edit-forum", element: <EditForum /> },
							{ path: ":postId", element: <PostHandler /> },
						],
					},
				],
			},
		],
	},
	{
		path: "/auth",
		element: <AuthRoot />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "sign-up", element: <SignUp /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
);
