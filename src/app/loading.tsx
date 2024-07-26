import React from "react";

const Loading = () => (
  <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default Loading;
