import React from "react";
import "./btns.css";

export const SubmitButton = ({ text }) => {
  return (
    <div className="items-center" style={{ width: "100%", display: "flex", justifyContent: "center" }} type="submit">
      <button className="w-[250px]  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-dark-blue dark:text-white dark:border-gray-600 dark:hover:bg-gray-700  transition-all duration-300 ease-in-out hover:scale-105 ">
        {text}
      </button>
    </div>
  );
};
