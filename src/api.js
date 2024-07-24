// src/api.js
import axios from "axios";

const BASE_URL = "http://172.10.7.103/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 세션 쿠키를 포함
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

// 특정 유저의 트랙들을 가져오는 함수
export const getUserTracks = (userId) =>
  apiClient.get(`/users/${userId}/tracks`);

// 새로운 트랙을 추가하는 함수
export const saveTrack = (userId, track) =>
  apiClient.post(`/users/${userId}/tracks`, track);
