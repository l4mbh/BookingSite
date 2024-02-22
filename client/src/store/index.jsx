import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import bookingSlice from "./bookingSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: { user: userReducer, booking: bookingSlice, search : searchSlice },
});
export default store;
