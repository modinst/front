import React, { useEffect, useState } from "react";
import TrackSelectionModal from "../components/TrackSelectionModal";
import SelectModal from "../components/SelectModal";
import MetronomeModal from "../components/MetronomeModal";
import SaveModal from "../components/SaveModal";

const RecordPage = () => {
  const [record, setRecord] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMetronomeModalOpen, setIsMetronomeModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState("90");
  const [recordDuration, setRecordDuration] = useState("1:31");

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

  const handleRecordYourSection = (instrument, bpm) => {
    setSelectedInstrument(instrument);
    setSelectedBpm(bpm);
    setIsTrackModalOpen(false);
    setIsMetronomeModalOpen(true);
  };

  const handleAddNewTrack = () => {
    setIsTrackModalOpen(false);
    setIsSelectModalOpen(true);
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

  const handleSave = (track) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      tracks: [
        ...prevRecord.tracks,
        {
          id: prevRecord.tracks.length + 1,
          title: track.projectName,
          bpm: `${track.bpm} BPM`,
          duration: track.duration,
          icon: `/path/to/${track.instrument.toLowerCase()}-icon.png`,
        },
      ],
    }));
    setIsSaveModalOpen(false);
  };

  const handleCloseMetronomeModal = () => {
    setIsMetronomeModalOpen(false);
  };

  const handleCloseSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const handleExport = () => {
    // Export 로직을 여기서 구현합니다.
    console.log("Exporting selected tracks:", selectedTracks);
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
            <button
              onClick={handleExport}
              className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
            >
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
        onAddNewTrack={handleAddNewTrack}
        onRecordYourSection={handleRecordYourSection}
      />
      <SelectModal
        isOpen={isSelectModalOpen}
        onClose={handleCloseSelectModal}
        onInstrumentSelect={setSelectedInstrument}
        onSubmit={handleSelectModalSubmit}
      />
      <MetronomeModal
        isOpen={isMetronomeModalOpen}
        onClose={handleCloseMetronomeModal}
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

export default RecordPage;
