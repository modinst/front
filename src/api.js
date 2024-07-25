import axios from "axios";
import { store } from "./store"; // store를 import

const BASE_URL = "http://172.10.7.103/api"; // 적절한 URL로 수정

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 세션 쿠키를 포함
});

// Axios 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const userId = state.auth.user ? state.auth.user.id : null;

  if (userId) {
    config.headers["x-user-id"] = userId;
  }

  return config;
});

export const register = (email, password, username) =>
  apiClient.post("/register", { email, password, username });

export const login = (email, password) =>
  apiClient.post("/login", { email, password });

export const checkSession = () => apiClient.get("/check-session");

export const logout = () => apiClient.post("/logout");

export const getGroups = () => apiClient.get("/groups");

export const createGroup = (name, description, image) =>
  apiClient.post("/groups", { name, description, image });

export const requestJoinGroup = (groupId) =>
  apiClient.post(`/groups/${groupId}/join-requests`);

// 특정 그룹의 멤버들을 가져오는 함수 추가
export const getGroupMembers = (groupId) =>
  apiClient.get(`/groups/${groupId}/members`);

// 특정 유저의 트랙들을 가져오는 함수
export const getUserTracks = async (userId) => {
  return apiClient.get(`/users/${userId}/tracks`);
};

export const saveTrack = async (userId, trackData) => {
  return apiClient.post(`/users/${userId}/tracks`, trackData);
};
