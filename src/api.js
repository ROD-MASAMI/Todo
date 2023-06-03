import axios from "axios";

const url = "https://dev.hisptz.com/dhis2/api/dataStore";
const api = axios.create({
  baseURL: url,
  timeout: 20000,
});

export default api;
