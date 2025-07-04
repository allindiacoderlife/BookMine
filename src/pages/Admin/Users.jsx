import React, { useState, useEffect } from "react";
import ComponentCard from "../../components/admin/ComponentsCard";
import UsersTable from "../../components/admin/UsersTable";
const Users = () => {
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
      <ComponentCard>
        {users === null ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Loading...
            </h3>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              No Users Available
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              It seems there are no users registered yet. You can start by creating a new user.
            </p>
          </div>
        ) : (
          <UsersTable users={users} />
        )}
      </ComponentCard>
    </div>
  );
};

export default Users;
