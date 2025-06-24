import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { icons } from "@/assets";
import { toast } from "react-toastify";
const BorrowBook = ({ bookId, userId, borrowingEligibility }) => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [borrowing, setBorrowing] = useState(false);
  const handleBorrow = async () => {
    if (!borrowingEligibility.isEligible) {
      toast.info(borrowingEligibility.message);
      return;
    }

    setBorrowing(true); // ✅ start loading before fetch

    try {
      const response = await fetch(`${mainUrl}/api/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");
    } catch (err) {
      console.error("Error borrowing book:", err);
      toast.error(
        err.message || "Failed to borrow the book. Please try again later."
      );
    } finally {
      setBorrowing(false); // ✅ always stop loading
    }
  };
  return (
    <Button className="book-overview_btn" onClick={handleBorrow}>
      <img src={icons.book} alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
