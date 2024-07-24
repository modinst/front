// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 사용자 인증 slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// 그룹 slice
const groupSlice = createSlice({
  name: "group",
  initialState: {
    groups: [],
    selectedGroup: null,
  },
  reducers: {
    setGroups(state, action) {
      state.groups = action.payload;
    },
    selectGroup(state, action) {
      state.selectedGroup = action.payload;
    },
  },
});

// 트랙 slice
const trackSlice = createSlice({
  name: "track",
  initialState: {
    tracks: [],
    selectedTrack: null,
  },
  reducers: {
    setTracks(state, action) {
      state.tracks = action.payload;
    },
    selectTrack(state, action) {
      state.selectedTrack = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { setGroups, selectGroup } = groupSlice.actions;
export const { setTracks, selectTrack } = trackSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    track: trackSlice.reducer,
  },
});

export default store;
