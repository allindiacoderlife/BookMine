import React, { useEffect, useState } from "react";
import BookOverview from "../components/BookOverview";
import Header from "../components/Header";
import BookVideo from "../components/BookVideo";

const BookDetail = () => {
  const bookId = window.location.pathname.split("/").pop();
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [bookDetails, setBookDetails] = useState(null);
  // Fetch book details from the API when the component mounts
  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/books/${bookId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      const data = await response.json();
      setBookDetails(data);
    } catch (err) {
      console.error("Error fetching book details:", err);
    }
  };
  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">
          <BookOverview {...bookDetails} />
          <div className="book-details">
            <div className="flex-[1.5]">
              <section className="flex flex-col gap-7">
                <h3>Video</h3>
                <BookVideo videoUrl={bookDetails?.videoUrl} />
              </section>
              <section className="flex flex-col gap-7">
                <h3>Summary</h3>
                <div className="space-y-5 text-xl text-light-100">
                  {bookDetails?.summary.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetail;
