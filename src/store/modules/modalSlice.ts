import {createSlice} from '@reduxjs/toolkit';

export interface ModalInfo {
  modalName: string;
  scheduleId: number;
  courseName: string;
  schDeptAlias: string;
  curiTypeCdNm: string;
}

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: {
    modalName: '',
    scheduleId: 0,
    courseName: '',
    schDeptAlias: '',
    curiTypeCdNm: '',
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

    setSchDeptAlias(state: ModalInfo, {payload}: {payload: string}) {
      state.schDeptAlias = payload;
    },

    setCuriTypeCdNm(state: ModalInfo, {payload}: {payload: string}) {
      state.curiTypeCdNm = payload;
    },

    clearModalInfo(state: ModalInfo) {
      state.modalName = '';
      state.scheduleId = 0;
      state.courseName = '';
      state.schDeptAlias = '';
      state.curiTypeCdNm = '';
    },
  },
});

export const {
  setModalName,
  setScheduleId,
  setCourseName,
  setSchDeptAlias,
  setCuriTypeCdNm,
  clearModalInfo,
} = modalInfo.actions;

export default modalInfo.reducer;
