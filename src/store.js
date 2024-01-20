import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slice";
import monitorReducer from "@/features/monitor/slice";
import approvalRequestServerListReducer from "@/features/approval-request/slice";
import approvalRequestFetchStatusReducer from "@/features/approval-request/fetchStatusSlice";
import userRoleReduser from "@/features/user-role/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    monitor: monitorReducer,
    approvalRequestServerList: approvalRequestServerListReducer,
    approvalRequestFetchStatus: approvalRequestFetchStatusReducer,
    userRole: userRoleReduser,
  },
});
