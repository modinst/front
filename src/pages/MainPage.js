// src/pages/MainPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import MyPage from "./MyPage";
import GroupPage from "./GroupPage";
import GroupRecordsPage from "./GroupRecordsPage";
import RecordDetailsPage from "./RecordDetailsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const MainPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("home");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/check-session", {
          method: "GET",
          credentials: "include", // 세션 쿠키를 포함
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(login({ username: data.user.username }));
        }
      } catch (error) {
        console.error("Failed to check session", error);
      }
    };

    checkSession();
  }, [dispatch]);

  const handleLoginSuccess = () => {
    setActivePage("home");
  };

  const handleRegisterSuccess = () => {
    setActivePage("login");
  };

  const renderPage = () => {
    if (
      !isAuthenticated &&
      activePage !== "home" &&
      activePage !== "login" &&
      activePage !== "register"
    ) {
      return (
        <div className="text-2xl font-bold p-4">
          Access Denied. Please log in.
        </div>
      );
    }

    switch (activePage) {
      case "mypage":
        return <MyPage />;
      case "home":
        return (
          <HomePage
            onLoginClick={() => setActivePage("login")}
            onRegisterClick={() => setActivePage("register")}
            isAuthenticated={isAuthenticated}
          />
        );
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
      case "login":
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case "register":
        return <RegisterPage onRegisterSuccess={handleRegisterSuccess} />;
      default:
        return (
          <HomePage
            onLoginClick={() => setActivePage("login")}
            onRegisterClick={() => setActivePage("register")}
            isAuthenticated={isAuthenticated}
          />
        );
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
