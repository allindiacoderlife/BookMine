import React from "react";
import { useState, useEffect } from "react";
import ComponentCard from "../../components/admin/ComponentsCard";
import BorrowTable from "../../components/admin/BorrowTable";
const BorrowRequests = () => {
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const [borrowData, setBorrowData] = useState(null);

  const fetchBorrow = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/borrows`);
      if (!response.ok) {
        throw new Error("Failed to fetch borrow data");
      }
      const data = await response.json();
      setBorrowData(data);
    } catch (err) {
      console.error("Error fetching Borrow Data:", err);
    }
  };

  useEffect(() => {
    fetchBorrow();
    console.log(borrowData);
  }, [0]);

  return (
    <div>
      <ComponentCard>
        {borrowData === null ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Loading...
            </h3>
          </div>
        ) : borrowData.filter((item) => item.status !== "PENDING").length ===
          0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              No Borrow Requests
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              All borrow requests have been handled.
            </p>
          </div>
        ) : (
          <BorrowTable borrowData={borrowData} />
        )}
      </ComponentCard>
    </div>
  );
};

export default BorrowRequests;
