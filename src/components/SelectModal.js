import React, { useState, useEffect } from "react";

const SelectModal = ({
  isOpen,
  onClose,
  onInstrumentSelect,
  onSubmit,
  bpm,
  isBpmEditable,
}) => {
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedBpm, setSelectedBpm] = useState(bpm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedInstrument(""); // 모달이 열릴 때마다 초기화
      setSelectedBpm(bpm); // 초기 BPM 설정
      setError(""); // 오류 메시지도 초기화
    }
  }, [isOpen, bpm]);

  const handleInstrumentSelect = (instrument) => {
    setSelectedInstrument(instrument);
    onInstrumentSelect(instrument);
    setError(""); // Reset error message when instrument is selected
  };

  const handleBpmChange = (e) => {
    setSelectedBpm(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedInstrument) {
      onSubmit(selectedBpm);
    } else {
      setError("Please select an instrument.");
    }
  };

  const getButtonClass = (instrument) => {
    return selectedInstrument === instrument
      ? "bg-blue-500 text-white p-2 rounded"
      : "bg-gray-200 p-2 rounded";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Select Instrument</h2>
        <div className="flex justify-around mb-4">
          <button
            onClick={() => handleInstrumentSelect("Guitar")}
            className={getButtonClass("Guitar")}
          >
            Guitar
          </button>
          <button
            onClick={() => handleInstrumentSelect("Drum")}
            className={getButtonClass("Drum")}
          >
            Drum
          </button>
          <button
            onClick={() => handleInstrumentSelect("Bass")}
            className={getButtonClass("Bass")}
          >
            Bass
          </button>
          <button
            onClick={() => handleInstrumentSelect("etc")}
            className={getButtonClass("etc")}
          >
            etc..
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">BPM</label>
          {isBpmEditable ? (
            <select
              id="bpm"
              value={selectedBpm}
              onChange={handleBpmChange}
              className="block w-full p-2 border rounded"
            >
              {Array.from({ length: 21 }, (_, i) => 60 + i * 5).map(
                (bpmValue) => (
                  <option key={bpmValue} value={bpmValue}>
                    {bpmValue}
                  </option>
                )
              )}
            </select>
          ) : (
            <div className="block w-full p-2 border rounded">{bpm}</div>
          )}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Let's Record
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SelectModal;
