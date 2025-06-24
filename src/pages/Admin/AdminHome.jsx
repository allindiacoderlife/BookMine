import React from "react";
import { Button } from "../../components/ui/button";
const AdminHome = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/BookMine/sign-in";
    console.log("User logged out");
  };
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <form action={() => logout()}>
        <Button>Logout</Button>
      </form>
    </section>
  );
};

export default AdminHome;
