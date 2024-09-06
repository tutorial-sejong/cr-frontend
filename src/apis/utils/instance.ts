import {setModalName} from '@/store/modules/modalSlice';
import {setType} from '@/store/modules/errorSlice';
import {store} from '@/store/store';
import axios, {AxiosError, AxiosResponse} from 'axios';
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

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

baseAPI.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = Cookies.get('accessToken');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

baseAPI.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: {status},
    } = error;
    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
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
        Cookies.set('accessToken', data.accessToken, {expires: 0.5 / 24});
        onAccessTokenFetched(data.accessToken);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return baseAPI(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    } else if (status === 404) {
      return Promise.resolve({...error.response, data: []} as AxiosResponse);
    } else if (status === 409) {
      store.dispatch(setModalName('fail'));
      store.dispatch(setType(409));

      return Promise.resolve({...error.response} as AxiosError);
    }

    return Promise.reject(error);
  },
);
