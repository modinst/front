// src/pages/MainPage.js
import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import MyPage from "./MyPage";
import GroupPage from "./GroupPage";
import GroupRecordsPage from "./GroupRecordsPage";
import RecordDetailsPage from "./RecordDetailsPage";
import LoginPage from "./LoginPage";
import { AuthContext } from "../contexts/AuthContext";

const MainPage = () => {
  const { state } = useContext(AuthContext);
  const [activePage, setActivePage] = useState("home");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      case "mypage":
        return <MyPage />;
      case "home":
        return <h1 className="text-2xl font-bold">Home Page</h1>;
      case "groups":
        return (
          <GroupPage
            onGroupClick={(group) => {
              setSelectedGroup(group);
              setActivePage("groupRecords");
            }}
          />
        );
      case "groupRecords":
        return selectedGroup ? (
          <GroupRecordsPage
            group={selectedGroup}
            onRecordClick={(recordId) => {
              setSelectedRecordId(recordId);
              setActivePage("recordDetails");
            }}
          />
        ) : (
          <h1 className="text-2xl font-bold">No Group Selected</h1>
        );
      case "recordDetails":
        return selectedRecordId ? (
          <RecordDetailsPage recordId={selectedRecordId} />
        ) : (
          <h1 className="text-2xl font-bold">No Record Selected</h1>
        );
      case "settings":
        return <h1 className="text-2xl font-bold">Settings Page</h1>;
      default:
        return <h1 className="text-2xl font-bold">Home Page</h1>;
    }
  };

  if (!state.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex">
      <Sidebar onMenuClick={setActivePage} />
      <div className="ml-64 flex-1 p-4">{renderPage()}</div>
    </div>
  );
};

export default MainPage;
