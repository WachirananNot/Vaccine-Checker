import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./slices/inputDataSlice";

export const store = configureStore({
  reducer: {inputItems: inputSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
