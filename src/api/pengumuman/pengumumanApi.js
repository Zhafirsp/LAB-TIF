import apiClient from "../apiClient";
import { PENGUMUMAN_URL } from "../apiUrl";

export const getPengumumanApi = (params) => {
  return apiClient.get(`${PENGUMUMAN_URL}`, { params });
};

export const getActivePengumumanApi = (params) => {
  return apiClient.get(`${PENGUMUMAN_URL}/active`, { params });
};

export const getPengumumanByIdApi = (id, params) => {
  return apiClient.get(`${PENGUMUMAN_URL}/${id}`, { params });
};

export const postPengumumanApi = (data) => {
  return apiClient.post(PENGUMUMAN_URL, data);
};

export const putPengumumanApi = (id, data) => {
  return apiClient.put(`${PENGUMUMAN_URL}/${id}`, data);
};

export const deletePengumumanApi = (id) => {
  return apiClient.delete(`${PENGUMUMAN_URL}/${id}`);
};
