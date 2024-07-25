import React, { useState, useEffect } from "react";
import { requestJoinGroup, getGroupMembers } from "../api"; // API 모듈에서 requestJoinGroup 및 getGroupMembers 함수 임포트

const GroupRequestModal = ({ isOpen, onClose, group }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (group && group._id) {
      const fetchMembers = async () => {
        try {
          const response = await getGroupMembers(group._id);
          setMembers(response.data);
        } catch (err) {
          console.error("Failed to fetch group members", err);
        }
      };

      fetchMembers();
    }
  }, [group]);

  const handleRequestJoin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Request join for group:", group._id);
      await requestJoinGroup(group._id);
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
        <h2 className="text-2xl font-bold mb-4">{group.group_name}</h2>
        <div className="mb-4">
          {members.length > 0 ? (
            members.map((member, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded mb-2">
                {member.user_id.username}
              </div>
            ))
          ) : (
            <div className="bg-gray-200 p-2 rounded mb-2">No members found</div>
          )}
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
