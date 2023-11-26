import apiClient from "../apiClient";
import { KEHADIRAN_URL } from "../apiUrl";

export const getKehadiranByPeriodeApi = () => {
  return apiClient.get(KEHADIRAN_URL, "20231");
};

export const getKehadiranByIdApi = (id) => {
  return apiClient.get(`${KEHADIRAN_URL}/${id}`);
};

export const getKehadiranByPertemuan = (params) => {
  return apiClient.get(`${KEHADIRAN_URL}/byPertemuan`, { params });
};

export const postKehadiranApi = (id, data) => {
  return apiClient.post(`${KEHADIRAN_URL}/${id}`, data);
};

export const putKehadiranApi = (id, data) => {
  return apiClient.put(`${KEHADIRAN_URL}/${id}`, data);
};
