import {createSlice} from '@reduxjs/toolkit';

export interface ModalInfo {
  modalName: string;
  scheduleId: number;
  courseName: string;
}

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: {
    modalName: '',
    scheduleId: 0,
    courseName: '',
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

    clearModalInfo(state: ModalInfo) {
      state.modalName = '';
      state.scheduleId = 0;
      state.courseName = '';
    },
  },
});

export const {setModalName, setScheduleId, setCourseName, clearModalInfo} = modalInfo.actions;

export default modalInfo.reducer;