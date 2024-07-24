// src/components/Sidebar.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store";
import { logout } from "../api";

const Sidebar = ({ onMenuClick }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
      onMenuClick("login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed: " + error.message);
    }
  };

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
      <div
        className="menu-item mb-4 cursor-pointer text-red-500"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
