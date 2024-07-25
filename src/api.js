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

export const getGroupMembers = (groupId) =>
  apiClient.get(`/groups/${groupId}/members`);

export const getJoinRequests = (groupId) =>
  apiClient.get(`/groups/${groupId}/join-requests`);

export const updateJoinRequestStatus = (groupId, requestId, status) =>
  apiClient.patch(`/groups/${groupId}/join-requests/${requestId}`, {
    request_status: status,
  });

export const getRecord = (recordId) => apiClient.get(`/records/${recordId}`);

export const registerTrackToRecord = (recordId, trackId) =>
  apiClient.post(`/records/${recordId}/tracks`, { trackId });

export const getAllTracks = () => apiClient.get("/tracks");

export const getInstruments = () => apiClient.get("/instruments");

export const getAllUploads = () => apiClient.get("/uploads");

export const getUpload = (filename) => apiClient.get(`/uploads/${filename}`);

export const uploadFile = (formData) => apiClient.post("/upload", formData);

export const getUserTracks = (userId) =>
  apiClient.get(`/users/${userId}/tracks`);

export const saveTrack = (userId, trackData) =>
  apiClient.post(`/users/${userId}/tracks`, trackData);
