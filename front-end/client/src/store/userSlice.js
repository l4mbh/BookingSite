import { createSlice } from "@reduxjs/toolkit";

const initState = {user: JSON.parse(localStorage.getItem('user')) || null, isLogin: localStorage.getItem('user') ? true : false};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isLogin = true;
    },
    logout (state, action) {
      localStorage.removeItem('user');
      state.user = null;
      state.isLogin = false;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;