import React, { useState, useEffect } from "react";

const GroupCreateModal = ({ isOpen, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupPicture, setGroupPicture] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setGroupName("");
      setDescription("");
      setGroupPicture(null);
    }
  }, [isOpen]);

  const handleGroupPictureChange = (event) => {
    const file = event.target.files[0];
    setGroupPicture(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = () => {
    if (groupName && description) {
      onCreate({ groupName, description, groupPicture });
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Make your Group</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Group name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Group picture</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleGroupPictureChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmit}
          >
            Submit the Group
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCreateModal;
