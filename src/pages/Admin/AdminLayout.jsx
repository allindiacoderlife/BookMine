import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

const AdminLayout = () => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div className="admin-container">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
