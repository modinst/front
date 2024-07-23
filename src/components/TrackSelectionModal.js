import React from "react";
import Track from "./Track";

const TrackSelectionModal = ({
  isOpen,
  onClose,
  tracks,
  onTrackSelect,
  onAddNewTrack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-8">Select Track</h2>
        <div className="space-y-4 overflow-y-auto max-h-96">
          {tracks.map((track) => (
            <Track
              key={track.id}
              title={track.title}
              bpm={track.bpm}
              duration={track.duration}
              icon={track.icon}
              onClick={() => onTrackSelect(track)}
            />
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={onAddNewTrack}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Track
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackSelectionModal;
