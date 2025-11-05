import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const res = await axiosInstance.get("/events");
  return res.data;
});

export const createEvent = createAsyncThunk("events/create", async (data) => {
  const res = await axiosInstance.post("/events", data);
  return res.data.event;
});

const eventSlice = createSlice({
  name: "events",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.loading = true; })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default eventSlice.reducer;
