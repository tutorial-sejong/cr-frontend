import {CourseTypes} from '@/assets/types/tableType';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ModalInfo {
  modalName: string;
  courseData: CourseTypes;
}

const initialState: ModalInfo = {
  modalName: '',
  courseData: {
    scheduleId: 0,
    schDeptAlias: '',
    curiTypeCdNm: '',
    curiNo: '',
    classNo: '',
    curiNm: '',
    manageDeptNm: '',
    lesnEmp: '',
    lesnTime: '',
    lesnRoom: '',
    rank: 1,
    wishCount: 0,
  },
};

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: initialState,
  reducers: {
    setModalName(state: ModalInfo, {payload}: {payload: string}) {
      state.modalName = payload;
    },
    setCourseData: (state, action: PayloadAction<Partial<CourseTypes>>) => {
      state.courseData = {...state.courseData, ...action.payload};
    },
    clearModalInfo: () => {
      return initialState;
    },
  },
});

export const {setModalName, setCourseData, clearModalInfo} = modalInfo.actions;

export default modalInfo.reducer;
