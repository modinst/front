import React, { useState, useEffect } from "react";
import TrackSelectionModal from "../components/TrackSelectionModal";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";
import { getRecord, registerTrackToRecord } from "../api";
import { useSelector } from "react-redux"; // Redux Store와 연결

const RecordDetailsPage = ({ recordId }) => {
  const [record, setRecord] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [tempTracks, setTempTracks] = useState([]);
  const userId = useSelector((state) => state.auth.user?.id); // Redux Store에서 userId 가져오기

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await getRecord(recordId);
        const { record, tracks } = response.data;
        console.log("Fetched record data:", record, tracks); // 콘솔 로그 추가
        if (!record.tracks) {
          record.tracks = tracks || [];
        }
        setRecord(record);
      } catch (error) {
        console.error("Failed to fetch record data", error);
      }
    };

    fetchRecordData();
  }, [recordId]);

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
      _id: new Date().getTime(),
      title: track.projectName,
      bpm: `${track.bpm} BPM`,
      icon: `/path/to/${track.instrument.toLowerCase()}-icon.png`,
      instrument: track.instrument,
    };
    const savedTrack = saveTrackToLocalStorage(newTrack);
    const updatedTempTracks = [...tempTracks, savedTrack];
    setTempTracks(updatedTempTracks);
    setIsSaveModalOpen(false);
  };

  const handleUploadTrack = async (track) => {
    try {
      if (!record || !record._id) {
        console.error("Record ID is not defined.");
        return;
      }
      const existingTrack = record.tracks.find((t) => t._id === track._id);
      if (existingTrack) {
        console.error("Track already registered to this record.");
        return;
      }
      await registerTrackToRecord(record._id, track._id);
      const updatedRecordTracks = [...record.tracks, track];
      setRecord({ ...record, tracks: updatedRecordTracks });
      const updatedTempTracks = tempTracks.filter((t) => t._id !== track._id);
      setTempTracks(updatedTempTracks);
    } catch (error) {
      console.error("Failed to upload track to record", error);
    }
  };

  const handleRemoveTempTrack = (track) => {
    const updatedTempTracks = tempTracks.filter((t) => t._id !== track._id);
    setTempTracks(updatedTempTracks);
  };

  if (!record) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  console.log("Record state:", record); // 콘솔 로그 추가

  return (
    <div className="relative w-full h-[1070px] bg-[#fff] overflow-hidden p-4">
      <div className="absolute left-[0.69%] right-[-0.76%] top-0 bottom-0"></div>
      <div className="absolute left-[132px] top-[150px] w-[1217px] flex">
        <div className="w-3/4">
          <h1 className="text-[32px] tracking-[-0em] font-['Nunito_Sans'] font-bold text-[#202224]">
            {record.title || "Untitled Record"}
          </h1>
          <div className="mt-4 space-y-4">
            {record.tracks.map((track) => (
              <div
                key={track._id}
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
                  key={track._id}
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
        onTrackSelect={handleTrackSelect}
        onAddNewTrack={handleAddNewTrack}
        userId={userId}
      />
      <SelectModal
        isOpen={isSelectModalOpen}
        onClose={handleCloseSelectModal}
        onInstrumentSelect={setSelectedInstrument}
        bpm={record.bpm}
        onSubmit={handleSelectModalSubmit}
        isBpmEditable={false}
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
        onSave={handleSave}
        userId={userId}
        recordId={record._id}
      />
      {tempTracks.length > 0 && (
        <div className="fixed bottom-8 left-8 p-4 bg-white rounded-lg shadow-lg max-w-md w-full z-50">
          <h3 className="text-xl font-bold mb-4">Temporary Tracks</h3>
          <div className="space-y-2">
            {tempTracks.map((track) => (
              <div
                key={track._id}
                className="bg-gray-100 p-2 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="text-lg font-semibold">{track.title}</div>
                  <div className="text-sm text-gray-500">
                    {track.instrument} - {track.bpm} BPM
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
