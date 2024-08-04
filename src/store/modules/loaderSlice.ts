import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {status: boolean} = {
  status: false,
};

const loaderSlice = createSlice({
  name: 'loaderSlice',
  initialState: initialState,
  reducers: {
    setLoader(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});

export const {setLoader} = loaderSlice.actions;
export default loaderSlice.reducer;
