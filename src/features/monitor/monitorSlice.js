import { createSlice } from "@reduxjs/toolkit";

export const monitorSlice = createSlice({
  name: "monitor",
  initialState: {
    data: null,
  },
  reducers: {
    setMonitorData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMonitorData } = monitorSlice.actions;

export default monitorSlice.reducer;
