import axios from "axios";
import store from "store";
import config from "../config";

const apiClient = axios.create({
  baseURL: `${config.API_URL}/api`,
});

apiClient.interceptors.request.use((request) => {
  const accessToken = store.get("accessToken");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers.AccessToken = accessToken;
  }

  request.headers.common["Content-Type"] = "application/json";
  request.headers.common["Access-Control-Allow-Origin"] = "*";
  return request;
});

export default apiClient;
