import {createSlice} from '@reduxjs/toolkit';

export interface UserInfo {
  accessToken: string;
  username: string;
}

const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    username: '',
    accessToken: '',
  },
  reducers: {
    setAccessToken(state: UserInfo, {payload}: {payload: string}) {
      state.accessToken = payload;
    },

    setUsername(state: UserInfo, {payload}: {payload: string}) {
      state.username = payload;
    },

    setUserInfo(state: UserInfo, {payload}: {payload: UserInfo}) {
      state.accessToken = payload.accessToken;
      state.username = payload.username;
    },
    
    clearUserInfo(state: UserInfo) {
      state.accessToken = '';
      state.username = '';
    },
  },
});

export const {
  setAccessToken,
  setUsername,
  setUserInfo,
  clearUserInfo,
} = userInfo.actions;

export default userInfo;
