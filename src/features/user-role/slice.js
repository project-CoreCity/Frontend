import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "userRole",
  initialState: {
    isAdmin: true,
  },
  reducers: {
    setUserRole: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;

export default userRoleSlice.reducer;
