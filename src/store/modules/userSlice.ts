import {createSlice} from '@reduxjs/toolkit';

export interface UserInfo {
  username: string;
}

const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    username: '',
  },
  reducers: {
    setUsername(state: UserInfo, {payload}: {payload: string}) {
      state.username = payload;
    },

    setUserInfo(state: UserInfo, {payload}: {payload: UserInfo}) {
      state.username = payload.username;
    },

    clearUserInfo(state: UserInfo) {
      state.username = '';
    },
  },
});

export const {setUsername, setUserInfo, clearUserInfo} = userInfo.actions;

export default userInfo.reducer;
