// src/pages/GroupRecordsPage.js
import React, { useEffect, useState } from "react";
import AddRecordModal from "../components/AddRecordModal";

const GroupRecordsPage = ({ group, onRecordClick }) => {
  const [records, setRecords] = useState([]);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      const recordData = [
        { id: 1, name: "Record #1", bpm: 90 },
        { id: 2, name: "Record #2", bpm: 90 },
        { id: 3, name: "Record #3", bpm: 90 },
        { id: 4, name: "Record #4", bpm: 90 },
      ];
      setRecords(recordData);
    };

    fetchGroupData();
  }, [group.id]);

  const handleAddRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsAddRecordModalOpen(true)}
      >
        + Add New Record
      </button>
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center cursor-pointer"
            onClick={() => onRecordClick(record.id)}
          >
            <div>{record.name}</div>
            <div>{record.bpm} BPM</div>
          </div>
        ))}
      </div>
      <AddRecordModal
        isOpen={isAddRecordModalOpen}
        onClose={() => setIsAddRecordModalOpen(false)}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
};

export default GroupRecordsPage;
