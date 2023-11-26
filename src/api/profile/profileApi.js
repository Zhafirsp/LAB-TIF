import apiClient from "../apiClient";
import { PROFILE_URL } from "../apiUrl";

const token = localStorage.getItem("accessToken");
export const getProfileApi = () => {
  return apiClient.get(PROFILE_URL, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileEditApi = (data) => {
  return apiClient.put(PROFILE_URL, {
    data,
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
