import React from "react";
import { admin } from "../../assets";
import { adminSideBarLinks } from "../../contents";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userInfo } from "../../lib/auth";
const Sidebar = () => {
  const { pathname } = useLocation();
  const user = userInfo();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <img src={admin.adminLogo} alt="logo" width={37} height={37} />
          <h1>BookMine</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link to={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <img
                      src={link.img}
                      alt="icon"
                      fill="true"
                      className={`${isSelected} ? "brightness-0 invert" : "object-contain"`}
                    />
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user">
        <Avatar>
          <AvatarFallback className="font-bold">
            {(user?.fullName)
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{user?.fullName}</p>
            <p className="text-light-500 text-xs">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
