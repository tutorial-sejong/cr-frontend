import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TabsInterface {
  id: number;
  name: string;
}

export interface TabSliceInterface {
  tab: TabsInterface[];
  focused: number;
}

const initialState: TabSliceInterface = {
  tab: [
    {
      id: 0,
      name: '강의시간표/수업계획서조회',
    },
  ],
  focused: 0,
};

const tabSlice = createSlice({
  name: 'tabSlice',
  initialState: initialState,
  reducers: {
    addTab(state, action: PayloadAction<TabsInterface>) {
      if (!state.tab.find(item => item.id === action.payload.id)) {
        state.tab.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },
    delTab(state, action: PayloadAction<number>) {
      state.tab = state.tab.filter(item => item.id !== action.payload);
    },
    setFocused(state, action: PayloadAction<number>) {
      state.focused = action.payload;
    },
    deleteAll: () => {
      return {tab: [], focused: 0};
    },
  },
});

export const {addTab, delTab, setFocused, deleteAll} = tabSlice.actions;
export default tabSlice.reducer;
