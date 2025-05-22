// src/api.js
import axios from "axios";
import { Store } from "../redux/store";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({ baseURL });

// Attach JWT token from store OR localStorage
api.interceptors.request.use((config) => {
  // 1) Try Redux store
  let token = Store.getState().user?.token;

  // 2) Fallback to localStorage
  if (!token) {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default api;
