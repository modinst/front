import React from "react";

const getIconByInstrument = (instrument) => {
  switch (instrument) {
    case "guitar":
      return "src/icons/guitar.png";
    case "bass":
      return "src/icons/bass.pngg";
    case "drums":
      return "src/icons/drum.png";
    default:
      return "src/icons/etc.png";
  }
};

const Track = ({ title, bpm, icon, onClick }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 ${
        onClick ? "cursor-pointer hover:bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={getIconByInstrument(icon)}
          alt="track icon"
          className="w-12 h-12"
        />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{bpm}</p>
        </div>
      </div>
    </div>
  );
};
export { getIconByInstrument };
export default Track;
