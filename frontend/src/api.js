import axios from "axios";

const VITE_API_URL = "https://hotels-8oh7.onrender.com/api";

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export default api;
