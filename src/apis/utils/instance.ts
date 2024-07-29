import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseAPI = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 토큰 받아오는 작업 필요
export const authAPI = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
