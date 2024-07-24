// src/pages/HomePage.js
import React from "react";

const HomePage = ({ onLoginClick, onRegisterClick, isAuthenticated }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      {!isAuthenticated && (
        <div>
          <button
            onClick={onLoginClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
