import React, { useState, useEffect } from "react";
import BookOverview from "../components/BookOverview";
import BookList from "../components/BookList";
import { sampleBooks } from "../contents/index";
import Header from "../components/Header";
const Home = () => {
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

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">
          <BookOverview {...bookData[1]} />

          <BookList
            title="Popular Books"
            books={bookData}
            containerClassName="mt-28"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
