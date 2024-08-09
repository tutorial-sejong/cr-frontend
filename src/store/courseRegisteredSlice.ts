import {createSlice} from '@reduxjs/toolkit';

export interface CourseRegistered {
  endCount: boolean
}

const courseRegistered = createSlice({
  name: 'courseRegistered',
  initialState: {
    endCount: false,
  },
  reducers: {
    setEndCount(state: CourseRegistered, {payload}: {payload: boolean}) {
      state.endCount = payload;
    },

    clearCount(state: CourseRegistered) {
      state.endCount = false;
    },
  },
});

export const {setEndCount, clearCount} = courseRegistered.actions;

export default courseRegistered.reducer;