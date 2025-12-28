import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './slices/city-slice';
import offersReducer from './slices/offers-slice';
import sortReducer from './slices/sort-slice';
import userReducer from './slices/user-slice';
import offerReducer from './slices/offer-slice';
import reviewsReducer from './slices/reviews-slice';
import { createAPI, setStore } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    sort: sortReducer,
    user: userReducer,
    offer: offerReducer,
    reviews: reviewsReducer
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

