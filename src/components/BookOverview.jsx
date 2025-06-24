import React from "react";
import { Button } from "../components/ui/button";
import BookCover from "./BookCover";
import { icons } from "@/assets";
import BorrowBook from "./BorrowBook";
import { userInfo } from "../lib/auth";
const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  _id,
}) => {
  const user = userInfo();
  const userId = user?._id || "";
  const borrowingEligibility = {
    // isEligible: availableCopies > 0 && user?.status === "APPROVED",
    isEligible: availableCopies > 0,
    message: availableCopies <= 0 ? "Book is not available" : "You are not eligible to borrow this book",
  }
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <img src={icons.star} alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Book: <span>{totalCopies}</span>
          </p>
          <p>
            Available Copies: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <BorrowBook bookId={_id} userId={userId} borrowingEligibility={borrowingEligibility}/>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 z-0 max-sm:hidden">
            <BookCover variant="wide" coverColor={coverColor} coverUrl={coverUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
