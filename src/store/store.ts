import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '@/store/modules/userSlice';
import modalSlice from '@/store/modules/modalSlice';
import courseRegisteredSlice from '@/store/modules/courseRegisteredSlice';
import tabSlice from './modules/tabSlice';
import errorSlice from './modules/errorSlice';

const reducers = combineReducers({
  userInfo: userSlice,
  modalInfo: modalSlice,
  courseRegistered: courseRegisteredSlice,
  tabs: tabSlice,
  error: errorSlice,
});

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['userInfo', 'modalInfo', 'courseRegistered'],
  blacklist: ['tabs', 'error'],
};

const persistStore = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistStore,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
