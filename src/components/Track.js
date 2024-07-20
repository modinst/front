// src/components/Track.js
import React from "react";

const Track = ({ title, bpm, duration, icon }) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4">
      <div className="track-info">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{bpm}</p>
        <p className="text-gray-600">{duration}</p>
      </div>
      <div className="track-icon">
        <img src={icon} alt="track icon" className="w-12 h-12" />
      </div>
    </div>
  );
};

export default Track;
