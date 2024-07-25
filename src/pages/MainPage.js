// src/pages/MainPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../store";
import { checkSession } from "../api";
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
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("home");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data } = await checkSession();
        console.log("Session data:", data); // 세션 데이터 로그
        if (data.user) {
          dispatch(
            loginAction({
              email: data.user.email,
              username: data.user.username,
              id: data.user.id,
            })
          );
        } else {
          dispatch(logoutAction());
        }
      } catch (error) {
        console.error("Failed to check session", error);
        dispatch(logoutAction());
        setActivePage("login"); // 세션 확인 실패 시 로그인 페이지로 이동
      }
    };

    checkUserSession();
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
