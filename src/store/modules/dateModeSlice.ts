import {createSlice} from '@reduxjs/toolkit';

export interface dateMode {
  userMajor: string;
  selectedDate: string;
}

const dateMode = createSlice({
  name: 'dateMode',
  initialState: {
    userMajor: '-전체-',
    selectedDate: '전체학년 (학과 제한 없음)',
  },
  reducers: {
    setUserMajor(state: dateMode, {payload}: {payload: string}) {
      state.userMajor = payload;
    },

    setSelectedDate(state: dateMode, {payload}: {payload: string}) {
      state.selectedDate = payload;
    },
  },
});

export const {setUserMajor, setSelectedDate} = dateMode.actions;

export default dateMode.reducer;
