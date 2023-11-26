import apiClient from "../apiClient";
import { PENILAIAN_URL } from "../apiUrl";

export const getPenialainByKelasApi = (id, params) => {
  return apiClient.get(`${PENILAIAN_URL}/rekap/${id}`, { params });
};

export const postPenilaianApi = (id, data) => {
  return apiClient.post(`${PENILAIAN_URL}/${id}`, data);
};

export const putPenilaianApi = (id, data) => {
  return apiClient.put(`${PENILAIAN_URL}/${id}`, data);
};

export const deletePenilaianApi = (id) => {
  return apiClient.delete(`${PENILAIAN_URL}/${id}`);
};
