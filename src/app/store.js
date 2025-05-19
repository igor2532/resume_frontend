import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './base.api.js';
import { cvReducer } from '../entities/cv';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cv: cvReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
