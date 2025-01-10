import {createSlice} from '@reduxjs/toolkit';

export interface dateMode {
  isConfirm: boolean;
  userMajor: string;
  selectedDate: string;
}

const dateMode = createSlice({
  name: 'dateMode',
  initialState: {
    isConfirm: false,
    userMajor: '-전체-',
    selectedDate: '전학년 (학과 제한 없음)',
  },
  reducers: {
    setIsConfirm(state: dateMode) {
      state.isConfirm = true;
    },

    setUserMajor(state: dateMode, {payload}: {payload: string}) {
      state.userMajor = payload;
    },

    setSelectedDate(state: dateMode, {payload}: {payload: string}) {
      state.selectedDate = payload;
    },

    resetDateMode(state: dateMode) {
      state.isConfirm = false;
      state.userMajor = '-전체-';
      state.selectedDate = '전학년 (학과 제한 없음)';
    },
  },
});

export const {setIsConfirm, setUserMajor, setSelectedDate, resetDateMode} =
  dateMode.actions;

export default dateMode.reducer;
