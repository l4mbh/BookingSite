import { createSlice } from "@reduxjs/toolkit";

const initState = { location: "", adult: 1, children: 0, rooms: 1 };

const searchSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    getSearchInfo(state, action) {
      state.location = action.payload.location;
      state.adult = action.payload.adult;
      state.children = action.payload.children;
      state.rooms = action.payload.rooms;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setAdult(state, action) {
      state.adult = action.payload;
    },
    setChildren(state, action) {
      state.children = action.payload;
    },
    setRooms(state, action) {
      state.rooms = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
