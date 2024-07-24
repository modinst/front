// src/pages/RecordDetailsPage.js
import React, { useState, useEffect } from "react";
import TrackSelectionModal from "../components/TrackSelectionModal";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";
import Track from "../components/Track";

const RecordDetailsPage = ({ userId }) => {
  const [record, setRecord] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [recordDuration, setRecordDuration] = useState("1:31");
  const [tempTracks, setTempTracks] = useState([]);

  useEffect(() => {
    const fetchRecordData = async () => {
      const recordData = {
        id: 1,
        name: `Record #1`,
        bpm: 90,
        tracks: [
          {
            id: 1,
            title: "Guitar Track #1",
            artist: "name1",
            bpm: 90,
            duration: "3:11",
            icon: "path/to/icon1.png",
          },
          {
            id: 2,
            title: "Drum Track #1",
            artist: "name2",
            bpm: 90,
            duration: "2:01",
            icon: "path/to/icon2.png",
          },
          {
            id: 3,
            title: "Guitar Track #2",
            artist: "name3",
            bpm: 90,
            duration: "3:31",
            icon: "path/to/icon3.png",
          },
        ],
      };
      setRecord(recordData);
    };

    fetchRecordData();
  }, []);

  const toggleTrackSelection = (track) => {
    setSelectedTracks((prevSelectedTracks) =>
      prevSelectedTracks.includes(track)
        ? prevSelectedTracks.filter((t) => t !== track)
        : [...prevSelectedTracks, track]
    );
  };

  const handleAddTrack = () => {
    setIsTrackModalOpen(true);
  };

  const handleCloseTrackModal = () => {
    setIsTrackModalOpen(false);
  };

  const handleTrackSelect = (track) => {
    setTempTracks([...tempTracks, track]);
    setIsTrackModalOpen(false);
  };

  const handleAddNewTrack = () => {
    setIsTrackModalOpen(false);
    setIsSelectModalOpen(true);
  };

  const handleCloseSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const handleSelectModalSubmit = () => {
    setIsSelectModalOpen(false);
    setIsMetronomeModalOpen(true);
  };

  const handleRecordComplete = () => {
    setIsMetronomeModalOpen(false);
    setRecordDuration("1:31");
    setIsSaveModalOpen(true);
  };

  const saveTrackToLocalStorage = (track) => {
    const savedTracks = JSON.parse(localStorage.getItem("tracks")) || [];
    savedTracks.push(track);
    localStorage.setItem("tracks", JSON.stringify(savedTracks));
    return track;
  };

  const handleSave = (track) => {
    const newTrack = {
      id: new Date().getTime(),
      title: track.projectName,
      bpm: `${track.bpm} BPM`,
      duration: track.duration,
      icon: `/path/to/${track.instrument.toLowerCase()}-icon.png`,
      instrument: track.instrument,
    };
    const savedTrack = saveTrackToLocalStorage(newTrack);
    const updatedTempTracks = [...tempTracks, savedTrack];
    setTempTracks(updatedTempTracks);
    setIsSaveModalOpen(false);
  };

  const handleUploadTrack = (track) => {
    const updatedRecordTracks = [...record.tracks, track];
    setRecord({ ...record, tracks: updatedRecordTracks });
    const updatedTempTracks = tempTracks.filter((t) => t.id !== track.id);
    setTempTracks(updatedTempTracks);
  };

  const handleRemoveTempTrack = (track) => {
    const updatedTempTracks = tempTracks.filter((t) => t.id !== track.id);
    setTempTracks(updatedTempTracks);
  };

  if (!record) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div className="relative w-full h-[1070px] bg-[#fff] overflow-hidden p-4">
      <div className="absolute left-[0.69%] right-[-0.76%] top-0 bottom-0"></div>
      <div className="absolute left-[132px] top-[150px] w-[1217px] flex">
        <div className="w-3/4">
          <h1 className="text-[32px] tracking-[-0em] font-['Nunito_Sans'] font-bold text-[#202224]">
            Record #1
          </h1>
          <div className="mt-4 space-y-4">
            {record.tracks.map((track) => (
              <div
                key={track.id}
                className="bg-[#fff] border-[1px] border-solid border-[#d5d5d5] rounded-[12px] p-4 flex justify-between items-center"
              >
                <div className="text-[20px] font-['Nunito_Sans'] font-semibold text-[#000] flex-grow">
                  {track.title}{" "}
                  <span className="text-sm text-gray-500">
                    By {track.artist}
                  </span>
                </div>
                <label className="flex items-center space-x-3 mr-4">
                  <input
                    type="checkbox"
                    checked={selectedTracks.includes(track)}
                    onChange={() => toggleTrackSelection(track)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-900">Select</span>
                </label>
                <button className="p-2 bg-blue-500 text-white rounded">
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 pl-4">
          <div className="bg-[#fff] rounded-[26px] p-4 shadow-md">
            <div className="text-[18px] font-['Nunito_Sans'] font-bold text-[#202224] mb-4">
              Export Record
            </div>
            <div className="space-y-2">
              {selectedTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-gray-100 rounded-lg shadow-md p-2 flex justify-between items-center"
                >
                  <div>{track.title}</div>
                  <div>{track.artist}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded w-full">
              Export
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddTrack}
        className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Select Your Track to Record
      </button>
      <TrackSelectionModal
        isOpen={isTrackModalOpen}
        onClose={handleCloseTrackModal}
        tracks={record.tracks}
        onTrackSelect={handleTrackSelect} // 기존 트랙 선택
        onAddNewTrack={handleAddNewTrack} // 새로운 트랙 추가
      />
      <SelectModal
        isOpen={isSelectModalOpen}
        onClose={handleCloseSelectModal}
        onInstrumentSelect={setSelectedInstrument}
        bpm={record.bpm}
        onSubmit={handleSelectModalSubmit}
        isBpmEditable={false} // BPM 변경 불가
      />
      <MetronomeModal
        isOpen={isMetronomeModalOpen}
        onClose={() => setIsMetronomeModalOpen(false)}
        instrument={selectedInstrument}
        bpm={record.bpm}
        onRecordComplete={handleRecordComplete}
      />
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        instrument={selectedInstrument}
        bpm={record.bpm}
        duration={recordDuration}
        onSave={handleSave}
      />
      {tempTracks.length > 0 && (
        <div className="fixed bottom-8 left-8 p-4 bg-white rounded-lg shadow-lg max-w-md w-full z-50">
          <h3 className="text-xl font-bold mb-4">Temporary Tracks</h3>
          <div className="space-y-2">
            {tempTracks.map((track) => (
              <div
                key={track.id}
                className="bg-gray-100 p-2 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="text-lg font-semibold">{track.title}</div>
                  <div className="text-sm text-gray-500">
                    {track.instrument} - {track.bpm} BPM - {track.duration}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUploadTrack(track)}
                  >
                    Upload
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveTempTrack(track)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordDetailsPage;
