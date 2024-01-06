import { createSlice } from "@reduxjs/toolkit";

export const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    loading: true,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.setError = action.payload;
    },
  },
});

export const { setLoading, setError } = fetchStatusSlice.actions;

export default fetchStatusSlice.reducer;
