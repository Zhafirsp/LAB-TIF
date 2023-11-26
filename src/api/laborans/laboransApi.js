import apiClient from "../apiClient";
import { LABORAN_URL } from "../apiUrl";

export const getDataLaboransApi = (params) => {
  return apiClient.get(LABORAN_URL, { params });
};

export const postLaboranApi = (username, data) => {
  return apiClient.post(`${LABORAN_URL}/${username}`, data);
};

export const getLaboranByNIPApi = (nip, params) => {
  return apiClient.get(`${LABORAN_URL}/${nip}`, params);
};

export const putLaboranApi = (nip, data) => {
  return apiClient.put(`${LABORAN_URL}/${nip}`, data);
};

export const deleteLaboranApi = (nip) => {
  return apiClient.delete(`${LABORAN_URL}/${nip}`);
};
