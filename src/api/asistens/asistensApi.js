import apiClient from "../apiClient";
import { ASISTEN_URL } from "../apiUrl";

export const getDataAsistensApi = (params) => {
  return apiClient.get(ASISTEN_URL, { params });
};

export const getAsistenByIdApi = (id, params) => {
  return apiClient.get(`${ASISTEN_URL}/${id}`, { params });
};

export const putAsistenApi = (id, data) => {
  return apiClient.put(`${ASISTEN_URL}/${id}`, data);
};

export const deleteAsistenApi = (id) => {
  return apiClient.delete(`${ASISTEN_URL}/${id}`);
};
