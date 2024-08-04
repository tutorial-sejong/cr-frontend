import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '@store/userSlice.ts';
import modalSlice from '@store/modalSlice.ts';
import courseRegisteredSlice from '@store/courseRegisteredSlice.ts';
import tabSlice from './modules/tabSlice';

const reducers = combineReducers({
  userInfo: userSlice,
  modalInfo: modalSlice,
  courseRegistered: courseRegisteredSlice,
  tabs: tabSlice,
});

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['userInfo', 'modalInfo', 'courseRegistered'],
  blacklist: ['tabs'],
};

const persistStore = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistStore,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;