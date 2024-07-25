import React, { useState } from "react";
import { createRecord } from "../api"; // createRecord API 함수 임포트

const GroupRecordsPage = ({ group, records, onRecordClick }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRecordTitle, setNewRecordTitle] = useState("");
  const [newRecordBpm, setNewRecordBpm] = useState("");

  const handleCreateRecord = async () => {
    try {
      const response = await createRecord(group._id, {
        title: newRecordTitle,
        bpm: newRecordBpm,
      });
      console.log("Created record:", response.data); // 디버깅 로그 추가
      setIsCreateModalOpen(false);
      // 필요한 경우, 상태를 업데이트하여 새로 생성된 레코드를 추가합니다.
      // onRecordCreate(response.data);
    } catch (error) {
      console.error("Failed to create record", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Group Records</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsCreateModalOpen(true)}
      >
        + Add New Record
      </button>
      <div className="grid grid-cols-3 gap-4">
        {records.map((record) => (
          <div
            key={record.record_id._id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => onRecordClick(record.record_id._id)}
          >
            <h2 className="text-xl font-bold mb-2">{record.record_id.title}</h2>
            <p className="text-gray-600 mb-4">BPM: {record.record_id.bpm}</p>
          </div>
        ))}
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Record</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={newRecordTitle}
                onChange={(e) => setNewRecordTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">BPM</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={newRecordBpm}
                onChange={(e) => setNewRecordBpm(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCreateRecord}
              >
                Create
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupRecordsPage;
