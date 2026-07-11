import axios from "axios";

const API = axios.create({
  baseURL: "https://groweasy-assignment-bqkh.onrender.com/api",
});

export default API;