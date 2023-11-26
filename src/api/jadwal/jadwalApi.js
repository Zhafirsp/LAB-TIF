import apiClient from "../apiClient";
import { JADWAL_URL, JADWAL_PIKET_URL } from "../apiUrl";

const dataToSend = {
  periode: "20231",
  kurikulum: "221",
  limit: 6000,
};

const token = localStorage.getItem("accessToken");

export const getJadwalApi = () => {
  return apiClient.post(JADWAL_URL, {
    dataToSend,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getJadwalPraktikumApi = (params) => {
  return apiClient.get(JADWAL_URL, { params });
};

export const getJadwalPraktikumByKelasApi = (id, params) => {
  return apiClient.get(`${JADWAL_PIKET_URL}/${id}`, {
    params,
  });
};

export const deleteJadwalByIdApi = (id) => {
  return apiClient.delete(`${JADWAL_PIKET_URL}/${id}`);
};

export const postPiketApi = (id, data) => {
  return apiClient.post(`${JADWAL_PIKET_URL}/${id}`, data);
};

export const putPiketApi = (id, data) => {
  return apiClient.put(`${JADWAL_PIKET_URL}/${id}`, data);
};
