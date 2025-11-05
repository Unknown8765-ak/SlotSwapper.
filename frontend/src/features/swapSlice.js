import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const getSwappableSlots = createAsyncThunk(
  "swap/getAll",
  async () => {
    const res = await axiosInstance.get("/events?status=SWAPPABLE");
    return res.data; // backend se list of events aayegi
  }
);


const swapSlice = createSlice({
  name: "swaps",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSwappableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSwappableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getSwappableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default swapSlice.reducer;
