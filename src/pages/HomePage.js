// src/pages/HomePage.js
import React from "react";

const HomePage = ({ onLoginClick, isAuthenticated }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      {!isAuthenticated && (
        <button
          onClick={onLoginClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default HomePage;
