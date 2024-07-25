import React, { useState, useEffect } from "react";
import Track from "./Track";
import { getUserTracks } from "../api"; // getUserTracks API 함수 임포트
import { useSelector } from "react-redux"; // Redux Store와 연결

const TrackSelectionModal = ({
  isOpen,
  onClose,
  onTrackSelect,
  onAddNewTrack,
  userId,
}) => {
  const [tracks, setTracks] = useState([]);
  const storeUserId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const fetchTracks = async () => {
      if (isOpen && userId) {
        try {
          const response = await getUserTracks(userId || storeUserId);
          setTracks(response.data);
        } catch (error) {
          console.error("Failed to fetch tracks", error);
        }
      }
    };

    fetchTracks();
  }, [isOpen, userId, storeUserId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto p-8 overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-8">Select Track</h2>
        <div className="space-y-4">
          {tracks.map((track) => (
            <Track
              key={track._id}
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
