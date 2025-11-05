import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import eventReducer from "../features/eventSlice";
import swapReducer from "../features/swapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    swaps: swapReducer,
  },
});
