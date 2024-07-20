import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MyPage from "./MyPage";
import GroupPage from "./GroupPage";
import GroupRecordsPage from "./GroupRecordsPage";

const MainPage = () => {
  const [activePage, setActivePage] = useState("mypage");
  const [selectedGroup, setSelectedGroup] = useState(null);

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
        return <GroupRecordsPage group={selectedGroup} />;
      case "settings":
        return <h1 className="text-2xl font-bold">Settings Page</h1>;
      default:
        return <h1 className="text-2xl font-bold">Home Page</h1>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onMenuClick={setActivePage} />
      <div className="ml-64 flex-1 p-4">{renderPage()}</div>
    </div>
  );
};

export default MainPage;
