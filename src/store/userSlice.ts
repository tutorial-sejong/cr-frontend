import { createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
    userName: string,
    accessToken: string
}

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        userName: '',
        accessToken: ''
    },
    reducers: {
        setUserName(state: UserInfo, { payload }: { payload: string }) {
            state.userName = payload;
        },
        setAccessToken(state: UserInfo, { payload }: { payload: string }) {
            state.accessToken = payload;
        }
    }
});

export const {
    setUserName,
    setAccessToken
} = userInfo.actions;

export default userInfo;