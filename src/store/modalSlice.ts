import {createSlice} from '@reduxjs/toolkit';

export interface MacroTypes {
  url: string;
  answer: string;
}

export interface ModalInfo {
  modalName: string;
  scheduleId: number;
  courseName: string;
  answer: number;
  url: string;
}

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: {
    modalName: '',
    scheduleId: 0,
    courseName: '',
    url: '',
    answer: 0,
  },
  reducers: {
    setModalName(state: ModalInfo, {payload}: {payload: string}) {
      state.modalName = payload;
    },

    setScheduleId(state: ModalInfo, {payload}: {payload: number}) {
      state.scheduleId = payload;
    },

    setCourseName(state: ModalInfo, {payload}: {payload: string}) {
      state.courseName = payload;
    },

    setAnswer(state: ModalInfo, {payload}: {payload: number}) {
      state.answer = payload;
    },

    setUrl(state: ModalInfo, {payload}: {payload: string}) {
      state.url = payload;
    },

    clearModalInfo(state: ModalInfo) {
      state.modalName = '';
      state.scheduleId = 0;
      state.courseName = '';
    },
  },
});

export const {
  setModalName,
  setScheduleId,
  setCourseName,
  setAnswer,
  setUrl,
  clearModalInfo,
} = modalInfo.actions;

export default modalInfo.reducer;
