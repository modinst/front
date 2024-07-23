// src/components/TrackSelectionModal.js
import React from "react";

const TrackSelectionModal = ({
  isOpen,
  onClose,
  tracks,
  onAddNewTrack,
  onSelectTrack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Select Your Track to Record</h2>
        <div className="flex flex-col space-y-2 mb-4">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="bg-gray-200 p-2 rounded text-left"
            >
              {track.title} - {track.bpm} BPM
            </button>
          ))}
        </div>
        <button
          onClick={onAddNewTrack}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Track
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TrackSelectionModal;
