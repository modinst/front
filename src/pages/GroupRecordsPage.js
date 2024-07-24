// src/pages/GroupRecordsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddRecordModal from "../components/AddRecordModal";

const GroupRecordsPage = ({ onRecordClick }) => {
  const { groupId } = useParams(); // URL 파라미터에서 groupId를 가져옵니다.
  const [records, setRecords] = useState([]);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [group, setGroup] = useState(null); // 그룹 데이터를 저장할 상태

  useEffect(() => {
    // 그룹 데이터 및 레코드 데이터를 가져오는 비동기 함수
    const fetchGroupData = async () => {
      // 여기서 실제 API 호출 또는 데이터베이스 쿼리를 수행해야 합니다.
      const groupData = {
        id: groupId,
        name: `Group ${groupId}`,
        description: `Description for group ${groupId}`,
      };
      setGroup(groupData);

      const recordData = [
        { id: 1, name: "Record #1", bpm: 90 },
        { id: 2, name: "Record #2", bpm: 90 },
        { id: 3, name: "Record #3", bpm: 90 },
        { id: 4, name: "Record #4", bpm: 90 },
      ];
      setRecords(recordData);
    };

    fetchGroupData();
  }, [groupId]); // groupId가 변경될 때마다 데이터를 다시 가져옵니다.

  const handleAddRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <div className="p-4">
      {group && <h1 className="text-2xl font-bold mb-4">{group.name}</h1>}
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
