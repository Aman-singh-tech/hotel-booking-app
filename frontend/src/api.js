import axios from "axios";

const API_URL = "https://hotels-8oh7.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
