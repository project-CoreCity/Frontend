import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    name: null,
    uid: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.uid = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
