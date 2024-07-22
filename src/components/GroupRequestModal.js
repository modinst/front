import React, { useState } from "react";
import axios from "axios";

const GroupRequestModal = ({ isOpen, onClose, group }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestJoin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = "your-user-id"; // TODO: 실제 사용자 ID를 여기에 설정
      const response = await axios.post(`http://172.10.7.103/api/groups/${group.id}/join-requests`, { user_id: userId });
      console.log("Request join response:", response.data);
      alert("Join request sent!");
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
