import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupRecordsPage = ({ group }) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://172.10.7.103/api/groups/${group.id}/records`);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [group.id]);

  const handleAddRecord = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newRecord = { name: "New Record", bpm: 120 }; // 예제 데이터, 실제 데이터 입력 폼 필요
      const response = await axios.post(`http://172.10.7.103/api/groups/${group.id}/records`, newRecord);
      setRecords([...records, response.data]);
    } catch (error) {
      setError("Failed to add record");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddRecord}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "+ Add New Record"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
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
