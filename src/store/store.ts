import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '@store/userSlice.ts';
import tabSlice from './modules/tabSlice';

const reducers = combineReducers({
  userInfo: userSlice,
  tabs: tabSlice,
});

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['userInfo'],
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
