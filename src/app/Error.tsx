import React from "react";
import RetryButton from "../../components/buttonRetry/buttonRetry"

const Error = () => {

  return (
    <div
      className="bg-red-500 text-white rounded-xl mx-auto my-0 rounded-md absolute right-0 left-0 bottom-50 top-50 text-center flex flex-col gap-3 justify-center items-center"
      style={{ height: "fit-content", width: "50%", padding: "10rem" }}
    >
      <p>Error</p>
      <RetryButton />
    </div>
  );
};

export default Error;
