import apiClient from "../apiClient";
import {
  JADWAL_URL,
  SEVIMA_DOSEN_URL,
  SEVIMA_KELAS_URL,
  SEVIMA_KRS_URL,
  SEVIMA_MATAKULIAH_URL,
  PRAKTIKAN_URL,
} from "../apiUrl";
const token = localStorage.getItem("accessToken");

const dataDosen = {
  homebase: "Fakultas Teknik",
  limit: 19,
  nip: "IF306",
};

export const getDosenApi = () => {
  return apiClient.post(SEVIMA_DOSEN_URL, {
    dataDosen,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const dataKelas = {
  periode: "20231",
  kurikulum: "221",
  limit: 1000,
};

export const getKelasApi = () => {
  return apiClient.post(SEVIMA_KELAS_URL, {
    dataKelas,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const dataKrs = {
  periode: "20231",
  limit: 1000000,
};

export const getKrsApi = () => {
  return apiClient.post(SEVIMA_KRS_URL, {
    dataKrs,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const dataMatkul = {
  kurikulum: "221",
  limit: 22,
};

export const getMatkulApi = () => {
  return apiClient.post(SEVIMA_MATAKULIAH_URL, {
    dataMatkul,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getPraktikanApi = (params) => {
  return apiClient.get(PRAKTIKAN_URL, { params });
};

export const postSevimaJadwal = (data) => {
  return apiClient.post(JADWAL_URL, data);
};

export const postSevimaKrs = (data) => {
  return apiClient.post(SEVIMA_KRS_URL, data);
};
