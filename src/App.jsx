import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Profile from "./pages/Profile";
import BookDetail from "./pages/BookDetail";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import Users from "./pages/Admin/Users";
import Books from "./pages/Admin/Books";
import BookNew from "./pages/Admin/BookNew";
import BookRequests from "./pages/Admin/BookRequests";
import AccountRequests from "./pages/Admin/AccountRequests";

import { isLoggedIn, userInfo } from "./lib/auth";

const App = () => {
  const loggedIn = isLoggedIn();
  const user = userInfo();

  // User must be logged in to access protected routes
  const RequireAuth = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };

  // Admin must be logged in and have admin role
  const RequireAdmin = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/sign-in" replace />;
    }
    if (user?.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <main>
      <Routes>
        {/* Root route: redirect admin to /admin, user to /home, otherwise sign-in */}
        <Route
          path="/"
          element={
            loggedIn ? (
              user?.role === "Admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />

        {/* Auth routes: only show sign-in/up if not logged in */}
        <Route
          path="/sign-in"
          element={
            loggedIn ? <Navigate to="/" replace /> : <Auth children={<SignIn />} />
          }
        />
        <Route
          path="/sign-up"
          element={
            loggedIn ? <Navigate to="/" replace /> : <Auth children={<SignUp />} />
          }
        />

        {/* Profile: only logged-in users */}
        <Route
          path="/my-profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        {/* Book detail: public route */}
        <Route path="/books/:id" element={<BookDetail />} />

        {/* Admin routes: protected, only admin role */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<Users />} />
          <Route path="books" element={<Books />} />
          <Route path="books/new" element={<BookNew />} />
          <Route path="book-requests" element={<BookRequests />} />
          <Route path="account-requests" element={<AccountRequests />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default App;
