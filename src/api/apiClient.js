import axios from "axios";
const { REACT_APP_LABTIF_API_HOST } = process.env;

const apiClient = axios.create({
  baseURL: REACT_APP_LABTIF_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  crossDomain: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    config.headers["Authorization"] = "Bearer " + token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
