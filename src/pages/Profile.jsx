import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import { sampleBooks } from "../contents";
import { Button } from "../components/ui/button";
import Header from "../components/Header";

const Profile = () => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [bookData, setBookData] = useState(sampleBooks);
  // Fetch books from the API when the component mounts
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBookData(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/BookMine/sign-in";
    console.log("User logged out");
  };
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <div className="mt-20 pb-20">
          <Header />
          <form action={() => logout()}>
            <Button>Logout</Button>
          </form>

          <BookList
            title="Borrowed Books"
            books={bookData}
            containerClassName="mt-28"
          />
        </div>
      </div>
    </main>
  );
};

export default Profile;
