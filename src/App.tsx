import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Forum from "./components/forum";
import Login from "./components/login";
import SignUp from "./components/sign-up";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="home" element={<Home />} />
          <Route path="r/:id" element={<Forum />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/login/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
