import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    name: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setUser, clearuser } = userSlice.actions;

export default userSlice.reducer;
