import React, { useState, useEffect } from "react";
import ComponentCard from "../../components/admin/ComponentsCard";
import AccountTable from "../../components/admin/AccountTable";
const AccountRequests = () => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <div>
      <ComponentCard title="Account Requests">
        {users === null ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Loading...
            </h3>
          </div>
        ) : users.filter((user) => user.status === "PENDING").length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              No Pending Users
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              All account requests have been handled.
            </p>
          </div>
        ) : (
          <AccountTable
            users={users.filter((user) => user.status === "PENDING")}
            refreshUsers={fetchUsers}
          />
        )}
      </ComponentCard>
    </div>
  );
};

export default AccountRequests;
