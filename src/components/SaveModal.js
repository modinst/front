import React, { useState, useEffect } from "react";
import { saveTrack } from "../api";
import { useSelector } from "react-redux"; // Redux Store와 연결

const SaveModal = ({ isOpen, onClose, instrument, bpm, onSave }) => {
  const [projectName, setProjectName] = useState("");
  const userId = useSelector((state) => state.auth.user?.id); // Redux Store에서 userId 가져오기

  useEffect(() => {
    setProjectName(""); // 모달이 열릴 때마다 프로젝트 이름 초기화
  }, [isOpen]);

  const handleSave = async (isPublic) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    const track = { title: projectName, instrument, bpm, isPublic };
    console.log("Saving track:", track);
    try {
      const response = await saveTrack(userId, track);
      onSave(response.data);
    } catch (error) {
      console.error("Failed to save track", error);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Save your music</h2>
        <div className="flex justify-around mb-4">
          <div className="bg-gray-200 p-2 rounded">{instrument}</div>
          <div className="bg-gray-200 p-2 rounded">{bpm} BPM</div>
        </div>
        <input
          type="text"
          placeholder="Write your project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-around">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleSave(true)}
          >
            Save as Public
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleSave(false)}
          >
            Save as Private
          </button>
        </div>
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

export default SaveModal;
