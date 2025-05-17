import React from "react";
import { cn } from "../lib/utils";
import BookCoverSvg from "./BookCoverSvg";
const variantStyles = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor,
  coverUrl,
}) => {
  return (
    <div
       className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "16%", width: "83.5%", height: "100%" }}
      >
        <img
          src={coverUrl}
          alt="Book Cover"
          fill="true"
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
