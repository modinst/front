import React from "react";

const GroupRecordsPage = ({ records }) => {
  console.log("Rendering GroupRecordsPage with records:", records); // 디버깅 로그 추가

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Group Records</h1>
      <div className="grid grid-cols-3 gap-4">
        {records.map((record) => (
          <div
            key={record.record_id._id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h2 className="text-xl font-bold mb-2">{record.record_id.title}</h2>
            <p className="text-gray-600 mb-4">BPM: {record.record_id.bpm}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupRecordsPage;
