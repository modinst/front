import React from "react";

const Track = ({ title, bpm, duration, icon, onClick }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 ${
        onClick ? "cursor-pointer hover:bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img src={icon} alt="track icon" className="w-12 h-12" />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{bpm}</p>
          <p className="text-gray-600">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default Track;
