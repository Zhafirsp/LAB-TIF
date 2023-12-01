import apiClient from "../apiClient";
import { PENDAFTARAN_URL } from "../apiUrl";

export const postPendaftaranApi = (id, data) => {
  return apiClient.post(`${PENDAFTARAN_URL}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePendaftaranApi = (id) => {
  return apiClient.delete(`${PENDAFTARAN_URL}/${id}`);
};

export const getPendaftaranByProgramApi = (id, params) => {
  return apiClient.get(`${PENDAFTARAN_URL}/${id}`, { params });
};

export const getPendaftaranByNimApi = (nim, params) => {
  return apiClient.get(`${PENDAFTARAN_URL}/nim/${nim}`, { params });
};

export const postValidateDataApi = (id, data) => {
  return apiClient.post(`${PENDAFTARAN_URL}/penerimaan/${id}`, data);
};
