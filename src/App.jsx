import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { isLoggedIn } from "./lib/auth";
import Profile from "./pages/Profile";
const App = () => {
  const loggedIn = isLoggedIn();  
  
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/sign-up" replace />}
        />
        <Route
          path="/sign-in"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Auth children={<SignIn />} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Auth children={<SignUp />} />
            )
          }
        />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
    </main>
  );
};

export default App;
