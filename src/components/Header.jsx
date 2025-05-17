import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link to="/">
        <img src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            to="/Library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/Library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
