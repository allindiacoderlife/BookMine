import React from "react";
import BookList from "../components/BookList";
import { sampleBooks } from "../contents";
import { Button } from "../components/ui/button";

const Profile = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/BookMine/sign-in";
    console.log("User logged out");
  };
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <div className="mt-20 pb-20">
          <form action={() => logout()}>
            <Button>Logout</Button>
          </form>

          <BookList
            title="Borrowed Books"
            books={sampleBooks}
            containerClassName="mt-28"
          />
        </div>
      </div>
    </main>
  );
};

export default Profile;
