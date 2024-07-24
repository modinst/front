// src/api.js
const BASE_URL = "http://172.10.7.103/api";

const request = async (endpoint, method = "GET", body) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const register = (email, password, username) =>
  request("/register", "POST", { email, password, username });

export const login = (email, password) =>
  request("/login", "POST", { email, password });

export const checkSession = () => request("/check-session");

export const logout = () => request("/logout");

export const getGroups = () => request("/groups");

export const createGroup = (name, description, image) =>
  request("/groups", "POST", { name, description, image });
