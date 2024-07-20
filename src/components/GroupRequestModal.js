// src/components/GroupRequestModal.js
import React from "react";

const GroupRequestModal = ({ isOpen, onClose, group }) => {
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Request Join
        </button>
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
