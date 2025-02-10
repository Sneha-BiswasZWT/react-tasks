import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Backend Auth API

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Store JWT
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Store User Info
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
