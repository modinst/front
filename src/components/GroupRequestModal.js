// src/components/GroupRequestModal.js
import React, { useState } from "react";

const GroupRequestModal = ({ isOpen, onClose, group }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestJoin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 서버 요청 로직은 나중에 추가
      // 예: const response = await fetch('/api/groups/join', {...});
      console.log("Request join for group:", group.id);
      alert("Join request simulated!");
      onClose();
    } catch (err) {
      setError("Failed to send join request");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{group.name}</h2>
        <div className="mb-4">
          {group.members.map((member, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded mb-2">
              {member}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleRequestJoin}
          disabled={isLoading}
        >
          {isLoading ? "Requesting..." : "Request Join"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GroupRequestModal;
