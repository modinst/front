import React from "react";
import { useParams } from "react-router-dom";

const RecordDetailsPage = () => {
  const { recordId } = useParams();

  // 예시 데이터
  const record = {
    id: recordId,
    name: `Record #${recordId}`,
    bpm: 90,
    tracks: [
      { id: 1, title: "Guitar Track #1", artist: "name1" },
      { id: 2, title: "Drum Track #1", artist: "name2" },
      { id: 3, title: "Bass Track #1", artist: "name3" },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{record.name}</h1>
      <div className="space-y-4">
        {record.tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div>{track.title}</div>
            <div>{track.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordDetailsPage;
