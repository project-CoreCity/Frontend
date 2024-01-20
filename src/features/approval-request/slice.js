import { createSlice } from "@reduxjs/toolkit";

export const approvalRequestServerListSlice = createSlice({
  name: "approvalRequestServerList",
  initialState: {
    serverList: {},
  },
  reducers: {
    setApprovalRequestServerList: (state, action) => {
      state.serverList = action.payload;
    },
  },
});

export const { setApprovalRequestServerList } =
  approvalRequestServerListSlice.actions;

export default approvalRequestServerListSlice.reducer;
