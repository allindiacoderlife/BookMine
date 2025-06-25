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
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/InputField";

const UsersTable = ({ users }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    universityId: "",
    role: "User",
    status: "PENDING",
  });
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      fullName: user.fullName || "",
      email: user.email || "",
      universityId: user.universityId || "",
      role: user.role || "User",
      status: user.status || "PENDING",
    });
    openModal();
  };

  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${mainUrl}/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      toast.success("User deleted successfully");
      // Optionally, you can refresh the users list or handle UI updates here
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Error deleting user");
    }
  };
  const updateUser = async () => {
    try {
      const res = await fetch(`${mainUrl}/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update user");

      toast.success("User updated successfully!");
      closeModal();
      // You may also want to refresh the user list here
    } catch (err) {
      toast.error("Error updating user");
      console.error(err);
    }
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateUser();
    closeModal();
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
                      <Badge color={user.role === "Admin" ? "primary" : "info"}>
                        {user.type === "Master" ? "Master" : user.role}
                      </Badge>
                    </TableCell>
                    {user.type !== "Master" && (
                      <>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-blue-300 text-white hover:bg-blue-700"
                              onClick={() => {
                                handleEditClick(user);
                              }}
                            >
                              <span className="text-xs">Edit</span>
                            </Button>
                            <Button
                              className="text-white hover:bg-red-700"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteUser(user._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit User Details
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    defaultValue={selectedUser?.fullName || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    defaultValue={selectedUser?.email || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>University ID</Label>
                  <Input
                    type="text"
                    defaultValue={selectedUser?.universityId || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, universityId: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Role</Label>
                  <select
                    defaultValue={selectedUser?.role || "User"}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    name="role"
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <Label>Status</Label>
                  <select
                    defaultValue={selectedUser?.status || "PENDING"}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                    name="status"
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-700"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
