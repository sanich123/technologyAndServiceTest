import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';

import tasks from './tasks/tasks';
import { trackingApi } from './tracking-api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tasks'],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({ tasks, [trackingApi.reducerPath]: trackingApi.reducer }),
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(trackingApi.middleware),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
