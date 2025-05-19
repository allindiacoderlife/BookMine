import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn, getInitials } from "../lib/utils";
import { icons } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userInfo } from "../lib/auth";
const Header = () => {
  const { pathname } = useLocation();
  const user = userInfo();
  console.log((user?.fullName).split(" ")[0]);

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link to="/">
        <img src={icons.logo} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            to="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link to="/my-profile">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="font-bold">
                {(user?.fullName)
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
