// src/pages/MyPage.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Track from "../components/Track";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";
import { getUserTracks, saveTrack } from "../api";

const MyPage = () => {
  const [tracks, setTracks] = useState([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [recordDuration, setRecordDuration] = useState("1:31");

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user || !user.id) {
        console.error("User is not defined");
        return;
      }

      try {
        const response = await getUserTracks(user.id);
        setTracks(response.data);
      } catch (error) {
        console.error("Failed to fetch tracks", error);
      }
    };

    if (user && user.id) {
      fetchTracks();
    }
  }, [user]);

  const handleSelectModalSubmit = (newBpm) => {
    setSelectedBpm(newBpm);
    setIsSelectModalOpen(false);
    setIsMetronomeModalOpen(true);
  };

  const handleRecordComplete = () => {
    setIsMetronomeModalOpen(false);
    setRecordDuration("1:31");
    setIsSaveModalOpen(true);
  };

  const handleSave = async (track) => {
    if (!user || !user.id) {
      console.error("User is not defined");
      return;
    }

    const trackData = {
      title: track.projectName,
      bpm: track.bpm,
      duration: track.duration,
      instrument: track.instrument,
      isPublic: track.isPublic,
    };

    try {
      const response = await saveTrack(user.id, trackData);
      setTracks([...tracks, response.data]);
    } catch (error) {
      console.error("Failed to save track", error);
    }

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
          key={track._id}
          title={track.title}
          bpm={`${track.bpm} BPM`}
          duration={track.duration}
          icon={track.icon}
        />
      ))}
      <SelectModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onInstrumentSelect={setSelectedInstrument}
        bpm={selectedBpm}
        onSubmit={handleSelectModalSubmit}
        isBpmEditable={true} // BPM 변경 가능
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
