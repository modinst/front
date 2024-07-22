import React, { useState, useEffect } from "react";
import axios from "axios";
import Track from "../components/Track";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";

const MyPage = () => {
  const [tracks, setTracks] = useState([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [recordDuration, setRecordDuration] = useState("1:31"); // 임시 녹음 시간
  const userId = "your-user-id"; // 실제 사용자 ID를 설정하세요

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(`http://172.10.7.103/api/users/${userId}/tracks`);
        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [userId]);

  const handleSelectModalSubmit = () => {
    setIsSelectModalOpen(false);
    setIsMetronomeModalOpen(true);
  };

  const handleRecordComplete = () => {
    setIsMetronomeModalOpen(false);
    setRecordDuration("1:31"); // 예제 녹음 시간
    setIsSaveModalOpen(true);
  };

  const handleSave = async (track) => {
    try {
      const newTrack = {
        title: track.projectName,
        bpm: `${track.bpm} BPM`,
        duration: track.duration,
        icon: `/path/to/${track.instrument.toLowerCase()}-icon.png`,
      };
      const response = await axios.post(`http://172.10.7.103/api/users/${userId}/tracks`, newTrack);
      setTracks([...tracks, response.data]);
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error("Error saving track:", error);
    }
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
