import React from "react";
import { userInfo } from "../../lib/auth";

const Header = () => {
    const user = userInfo();
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">{user?.fullName}</h2>
        <p className="text-base text-slate-500">Monitor all of your users and books here</p>
      </div>
    </header>
  );
};

export default Header;
