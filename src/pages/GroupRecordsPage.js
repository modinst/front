import React from "react";
import { useParams, useHistory } from "react-router-dom";

const GroupRecordsPage = () => {
  const { groupId } = useParams();
  const history = useHistory();
  const records = [
    { id: 1, name: "Record #1", bpm: 90 },
    { id: 2, name: "Record #2", bpm: 90 },
    { id: 3, name: "Record #3", bpm: 90 },
    { id: 4, name: "Record #4", bpm: 90 },
  ];

  // 예시로 그룹 정보를 설정합니다. 실제로는 API 호출 등을 통해 데이터를 가져옵니다.
  const group = {
    id: groupId,
    name: "Jason's Group",
  };

  const handleRecordClick = (recordId) => {
    history.push(`/record/${recordId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + Add New Record
      </button>
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center cursor-pointer"
            onClick={() => handleRecordClick(record.id)}
          >
            <div>{record.name}</div>
            <div>{record.bpm} BPM</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupRecordsPage;
