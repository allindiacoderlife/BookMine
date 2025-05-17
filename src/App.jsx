import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Auth children={<SignIn />} />} />
        <Route path="/sign-up" element={<Auth children={<SignUp />} />} />
      </Routes>
    </main>
  );
};

export default App;
