// src/components/Sidebar.js
import React from "react";

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="w-64 bg-gray-200 h-screen p-4 shadow-md fixed top-0 left-0 z-10">
      <div
        className="menu-item mb-4 cursor-pointer"
        onClick={() => onMenuClick("home")}
      >
        Home
      </div>
      <div
        className="menu-item mb-4 cursor-pointer"
        onClick={() => onMenuClick("mypage")}
      >
        My Page
      </div>
      <div
        className="menu-item mb-4 cursor-pointer"
        onClick={() => onMenuClick("groups")}
      >
        Groups
      </div>
      <div
        className="menu-item mb-4 cursor-pointer"
        onClick={() => onMenuClick("settings")}
      >
        Settings
      </div>
    </div>
  );
};

export default Sidebar;
