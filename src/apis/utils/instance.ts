import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseAPI = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];
const expiration = new Date(Date.now() + 600 * 1000);

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

baseAPI.interceptors.response.use(
  response => response,
  async error => {
    const {
      config,
      response: {status},
    } = error;
    const originalRequest = config;

    if (
      (status === 401 || status === 403 || status === 500) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(resolve => {
          addSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(baseAPI(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const {data} = await baseAPI.post('/api/auth/refresh');

        baseAPI.defaults.headers.common['Authorization'] =
          `Bearer ${data.accessToken}`;
        Cookies.set('accessToken', data.accessToken, {expires: expiration});
        isRefreshing = false;
        onAccessTokenFetched(data.accessToken);

        return baseAPI(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
