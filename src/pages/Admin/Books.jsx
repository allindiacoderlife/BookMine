import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ComponentCard from "../../components/admin/ComponentsCard";
import BookTable from "../../components/admin/BookTable";
const Books = () => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [books, setBooks] = useState(null);
  // Fetch books from the API when the component mounts
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [books]);
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link to="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <ComponentCard
          title="Books Table"
          description="Manage your books efficiently with our comprehensive table view."
        >
          {books === null ? (
            <div className="flex flex-col items-center justify-center h-96">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Loading...
              </h3>
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                No Books Available
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Start by creating a new book to manage your library.
              </p>
            </div>
          ) : (
            <BookTable books={books} />
          )}
        </ComponentCard>
      </div>
    </section>
  );
};

export default Books;
