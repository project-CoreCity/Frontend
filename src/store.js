import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slice";
import monitorReducer from "@/features/monitor/slice";
import pendingRequestsReducer from "@/features/pending-requests/slice";
import pendingRequestsFetchStatusReducer from "@/features/pending-requests/fetchStatusSlice";
import userRoleReducer from "@/features/user-role/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    monitor: monitorReducer,
    pendingRequests: pendingRequestsReducer,
    pendingRequestsFetchStatus: pendingRequestsFetchStatusReducer,
    userRole: userRoleReducer,
  },
});
