import axios, {AxiosError, AxiosResponse} from 'axios';
import Cookies from 'js-cookie';
import {setModalName} from '@/store/modules/modalSlice';
import {setType} from '@/store/modules/errorSlice';
import {store} from '@/store/store';
import {clearUserInfo} from '@/store/modules/userSlice';
import {resetCourseRegistered} from '@/store/modules/courseRegisteredSlice';

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
      config.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
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
    const {config, response} = error;
    const originalRequest = config;
    const code = response.data.code;

    if (code === 'A002' && !originalRequest._retry) {
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
        Cookies.set('accessToken', data.accessToken, {expires: 1});
        onAccessTokenFetched(data.accessToken);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return baseAPI(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    } else if (code === 'A001' || code === 'A003') {
      store.dispatch(clearUserInfo());
      store.dispatch(resetCourseRegistered());
      delete baseAPI.defaults.headers.common['Authorization'];
      location.href = '/';
      Cookies.remove('accessToken');
    } else if (code === 'S001' || code === 'W003') {
      // 검색결과 없음
      return Promise.resolve({...error.response, data: []} as AxiosResponse);
    } else if (code === 'C001' || code === 'W001' || code === 'W002') {
      store.dispatch(setModalName('fail'));
      store.dispatch(setType(409));

      return Promise.reject({...error.response} as AxiosError);
    } else if (code === 'G001' || code === 'G005') {
      location.href = '/*';
    }

    return Promise.reject(error);
  },
);
