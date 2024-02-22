import { createSlice } from "@reduxjs/toolkit";

const initState = {startDate : new Date().toISOString(), endDate : new Date().toISOString()};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initState,
  reducers : {
    setDateRange(state, action) {
      state.startDate = new Date(action.payload.startDate).toISOString();
      state.endDate = new Date(action.payload.endDate).toISOString();
    },
    setStartDate(state, action) {
      state.startDate = new Date(action.payload).toISOString();
    },
    setEndDate(state, action) {
      state.endDate = new Date(action.payload).toISOString();
    },
  }
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;