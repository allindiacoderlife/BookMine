import React from "react";
import BookOverview from "../components/BookOverview";
import BookList from "../components/BookList";
import { sampleBooks } from "../contents/index";
import Header from "../components/Header";
const Home = () => {
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">
          <BookOverview {...sampleBooks[0]} />

          <BookList
            title="Popular Books"
            books={sampleBooks}
            containerClassName="mt-28"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
