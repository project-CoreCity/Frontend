import { createSlice } from "@reduxjs/toolkit";

export const pendingRequestsSlice = createSlice({
  name: "pendingRequests",
  initialState: {
    requests: {},
  },
  reducers: {
    setRequestData: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { setRequestData } = pendingRequestsSlice.actions;

export default pendingRequestsSlice.reducer;
