import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI, setStore } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    data: reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

