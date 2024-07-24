// src/components/AddRecordModal.js
import React, { useState } from "react";

const AddRecordModal = ({ isOpen, onClose, onAddRecord }) => {
  const [recordName, setRecordName] = useState("");
  const [recordBpm, setRecordBpm] = useState("90");

  const handleSave = () => {
    const newRecord = {
      id: new Date().getTime(),
      name: recordName,
      bpm: recordBpm,
    };
    onAddRecord(newRecord);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Add New Record</h2>
        <div className="mb-4">
          <label className="block mb-2">Record Name</label>
          <input
            type="text"
            value={recordName}
            onChange={(e) => setRecordName(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">BPM</label>
          <select
            value={recordBpm}
            onChange={(e) => setRecordBpm(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            {Array.from({ length: 21 }, (_, i) => 60 + i * 5).map((bpm) => (
              <option key={bpm} value={bpm}>
                {bpm}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
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

export default AddRecordModal;
