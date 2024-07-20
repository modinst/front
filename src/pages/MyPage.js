// src/pages/MyPage.js
import React, { useState } from "react";
import Track from "../components/Track";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";

const MyPage = () => {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "My new Guitar Track #1",
      bpm: "90 BPM",
      duration: "3:11",
      icon: "/path/to/guitar-icon.png",
    },
    {
      id: 2,
      title: "My new Drum Track #1",
      bpm: "105 BPM",
      duration: "2:01",
      icon: "/path/to/drum-icon.png",
    },
    {
      id: 3,
      title: "My new Guitar Track #2",
      bpm: "90 BPM",
      duration: "3:31",
      icon: "/path/to/guitar-icon.png",
    },
  ]);

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [recordDuration, setRecordDuration] = useState("1:31"); // 임시 녹음 시간

  const handleSelectModalSubmit = () => {
    setIsSelectModalOpen(false);
    setIsMetronomeModalOpen(true);
  };

  const handleRecordComplete = () => {
    setIsMetronomeModalOpen(false);
    setRecordDuration("1:31"); // 예제 녹음 시간
    setIsSaveModalOpen(true);
  };

  const handleSave = (track) => {
    console.log("Track before saving:", track); // 로그 추가
    setTracks([
      ...tracks,
      {
        id: tracks.length + 1,
        title: track.projectName,
        bpm: `${track.bpm} BPM`,
        duration: track.duration,
        icon: `/path/to/${track.instrument.toLowerCase()}-icon.png`,
      },
    ]);
    setIsSaveModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      <button
        onClick={() => setIsSelectModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Record Your Section
      </button>
      {tracks.map((track) => (
        <Track
          key={track.id}
          title={track.title}
          bpm={track.bpm}
          duration={track.duration}
          icon={track.icon}
        />
      ))}
      <SelectModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onInstrumentSelect={setSelectedInstrument}
        onBpmSelect={setSelectedBpm}
        onSubmit={handleSelectModalSubmit}
      />
      <MetronomeModal
        isOpen={isMetronomeModalOpen}
        onClose={() => setIsMetronomeModalOpen(false)}
        instrument={selectedInstrument}
        bpm={selectedBpm}
        onRecordComplete={handleRecordComplete}
      />
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        instrument={selectedInstrument}
        bpm={selectedBpm}
        duration={recordDuration}
        onSave={handleSave}
      />
    </div>
  );
};

export default MyPage;
