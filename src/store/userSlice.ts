import {createSlice} from '@reduxjs/toolkit';

export interface UserInfo {
  accessToken: string;
  refreshToken: string;
  username: string;
}

const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setAccessToken(state: UserInfo, {payload}: {payload: string}) {
      state.accessToken = payload;
    },

    setRefreshToken(state: UserInfo, {payload}: {payload: string}) {
      state.accessToken = payload;
    },

    setUsername(state: UserInfo, {payload}: {payload: string}) {
      state.username = payload;
    },

    setUserInfo(state: UserInfo, {payload}: {payload: UserInfo}) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.username = payload.username;
    },
    
    clearUserInfo(state: UserInfo) {
      state.accessToken = '';
      state.refreshToken = '';
      state.username = '';
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setUsername,
  setUserInfo,
  clearUserInfo,
} = userInfo.actions;

export default userInfo;
