import {defaultTime} from '@/assets/data/constant';
import {createSlice} from '@reduxjs/toolkit';

export interface CourseRegistered {
  endCount: boolean;
  time: number;
}

const courseRegistered = createSlice({
  name: 'courseRegistered',
  initialState: {
    endCount: false,
    time: defaultTime,
  },
  reducers: {
    setEndCount(state: CourseRegistered, {payload}: {payload: boolean}) {
      state.endCount = payload;
    },
    setTime(state: CourseRegistered, {payload}: {payload: number}) {
      state.time = payload;
    },
    clearCount(state: CourseRegistered) {
      state.endCount = false;
    },
    cleatTime(state: CourseRegistered) {
      state.time = defaultTime;
    },
    resetCourseRegistered(state: CourseRegistered) {
      state.endCount = false;
      state.time = defaultTime;
    },
  },
});

export const {
  setEndCount,
  setTime,
  clearCount,
  cleatTime,
  resetCourseRegistered,
} = courseRegistered.actions;

export default courseRegistered.reducer;
