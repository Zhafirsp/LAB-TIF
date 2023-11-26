import apiClient from "../apiClient";
import { LOGIN_URL, REGISTER_URL } from "../apiUrl";

export const postLoginApi = (data) => {
  return apiClient.post(LOGIN_URL, data);
};

export const postRegisterApi = (data) => {
  return apiClient.post(REGISTER_URL, data);
};