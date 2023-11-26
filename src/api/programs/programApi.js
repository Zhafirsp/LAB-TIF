import apiClient from "../apiClient";
import { PROGRAM_URL } from "../apiUrl";

export const getDataProgramApi = (params) => {
  return apiClient.get(PROGRAM_URL, { params });
};

export const postProgramApi = (data) => {
  return apiClient.post(`${PROGRAM_URL}`, data);
};

export const getProgramByIdApi = (id, params) => {
  return apiClient.get(`${PROGRAM_URL}/${id}`, params);
};

export const putProgramApi = (id, data) => {
  return apiClient.put(`${PROGRAM_URL}/${id}`, data);
};

export const deleteProgramApi = (id) => {
  return apiClient.delete(`${PROGRAM_URL}/${id}`);
};
