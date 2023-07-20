import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Forum from "./components/forum/forum";
import Login from "./components/login/login";
import CreateForumAPI from "./components/create-components/create-forum-api";
import "./App.css";
import { FirebaseApp } from "./utli/firebase";

import { getAuth, signInAnonymously } from "firebase/auth";
import CreatePostAPI from "./components/create-components/create-post-api";

function App() {
  const app = useContext(FirebaseApp);
  const auth = getAuth(app);

  useEffect(() => {
    const anonymously = async () => {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.error(e);
      }
    };
    anonymously();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create-forum" element={<CreateForumAPI />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="r/:id">
          <Route index element={<Forum />} />
          <Route path="create-message" element={<CreatePostAPI />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
