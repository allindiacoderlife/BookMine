import React from "react";
import { icons , images } from "@/assets";
const Auth = ({ children }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <img src={icons.logo} alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookMine</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <img
          src={images.authIllustration}
          alt="auth illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Auth;
