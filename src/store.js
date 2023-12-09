import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import monitorReducer from "./features/monitor/monitorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    monitor: monitorReducer,
  },
});
