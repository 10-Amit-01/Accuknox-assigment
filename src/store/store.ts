import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import uiSliceReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    ui: uiSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
