// src/components/MetronomeModal.js
import React, { useState } from "react";

const MetronomeModal = ({
  isOpen,
  onClose,
  instrument,
  bpm,
  onRecordComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    // 녹음 시작 로직 (서버로 전송 등)
    setTimeout(() => {
      setIsRecording(false);
      onRecordComplete(); // 녹음 완료 시 저장 모달 표시
    }, 5000); // 5초 동안 녹음 시뮬레이션
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Metronome</h2>
        <p>Instrument: {instrument}</p>
        <p>BPM: {bpm}</p>
        <div className="flex justify-around my-4">
          <button
            className="bg-gray-200 p-4 rounded-full"
            onClick={startRecording}
          >
            {isRecording ? "Recording..." : "Start Record"}
          </button>
          <button className="bg-gray-200 p-4 rounded-full">
            Start Metronome
          </button>
        </div>
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

export default MetronomeModal;
