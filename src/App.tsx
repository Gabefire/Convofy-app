import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Forum from "./components/forum";
import Login from "./components/login";
import SignUp from "./components/sign-up";
import CreateForum from "./components/create-forum";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create-forum" element={<CreateForum />} />
          <Route path="r/:id" element={<Forum />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/login/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
