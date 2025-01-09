import {createSlice} from '@reduxjs/toolkit';

export interface CourseRegistered {
  endCount: boolean;
  time: number;
}

const courseRegistered = createSlice({
  name: 'courseRegistered',
  initialState: {
    endCount: false,
    time: 35,
  },
  reducers: {
    setEndCount(state: CourseRegistered, {payload}: {payload: boolean}) {
      state.endCount = payload;
    },
    setTime(state: CourseRegistered, {payload}: {payload: number}) {
      if (payload <= 10) {
        state.time = 10;
      } else {
        state.time = payload;
      }
    },
    clearCount(state: CourseRegistered) {
      state.endCount = false;
    },
    cleatTime(state: CourseRegistered) {
      state.time = 35;
    },
    resetCourseRegistered(state: CourseRegistered) {
      state.endCount = false;
      state.time = 35;
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
