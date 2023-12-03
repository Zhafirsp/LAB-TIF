import axios, { Axios } from "axios";
import apiClient from "../apiClient";
import { SEVIMA_USER_URL, USER_URL } from "../apiUrl";
import Cookies from "js-cookie";

const token = localStorage.getItem("accessToken");
const refreshToken = Cookies.get("refresh_Token");

export const getDataUsersApi = async () => {
  return apiClient.get(USER_URL, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${(token, refreshToken)}`,
    },
  });
};

export const getDataUserByIdApi = (id, params) => {
  return apiClient.get(`${USER_URL}/${id}`, params);
};

export const putUserApi = (id, data) => {
  return apiClient.put(`${USER_URL}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUserApi = (id) => {
  return apiClient.delete(`${USER_URL}/${id}`);
};

export const getSevimaDataUsersApi = (params) => {
  return apiClient.get(SEVIMA_USER_URL, { params });
};


export const postSevimaDataUsersApi = (data) => {
  return apiClient.post(SEVIMA_USER_URL, data);
};