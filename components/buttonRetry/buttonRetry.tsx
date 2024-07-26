"use client"
import React from "react";

const handleRetry = () => {
  window.location.reload();
};

const RetryButton = () => (
  <button
    onClick={handleRetry}
    className="bg-white w-fit text-red-500 p-2 mt-2 rounded-md"
  >
    Retry
  </button>
);

export default RetryButton;