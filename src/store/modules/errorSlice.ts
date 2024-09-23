import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  type: 0,
  field: '',
};

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: initialState,
  reducers: {
    setType(state, action: PayloadAction<number>) {
      state.type = action.payload;
    },
    setField(state, action: PayloadAction<string>) {
      state.field = action.payload;
    },
    resetError: () => {
      return initialState;
    },
  },
});

export const {setType, setField, resetError} = errorSlice.actions;
export default errorSlice.reducer;
