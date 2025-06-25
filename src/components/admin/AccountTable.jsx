import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/tables";
import Badge from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const AccountTable = ({ users , refreshUsers}) => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const updateUserStatus = async (userId, updateObj) => {
  try {
    const res = await fetch(`${mainUrl}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error);

    toast.success("User status updated successfully");

    if (typeof refreshUsers === "function") refreshUsers();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status");
  }
};

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    University ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-[12px] dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-700 text-sm dark:text-white/90">
                          {user.fullName}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.universityId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          color={
                            user.status === "APPROVED"
                              ? "success"
                              : user.status === "PENDING"
                              ? "warning"
                              : "error"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          color={user.role === "Admin" ? "primary" : "info"}
                        >
                          {user.type === "Master" ? "Master" : user.role}
                        </Badge>
                      </TableCell>
                      {user.type !== "Master" && user.status === "PENDING" && (
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-green-500 text-white hover:bg-green-700 text-xs"
                              onClick={(e) => {
                                updateUserStatus(user._id, {
                                  status: "APPROVED",
                                });
                                e.preventDefault();
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              className="bg-red-500 text-white hover:bg-red-700 text-xs"
                              onClick={() => {
                                  e.preventDefault();
                                updateUserStatus(user._id, {
                                  status: "REJECTED",
                                });
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTable;
