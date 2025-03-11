import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: {
    currentCustomer: null,
    loggedIn: false,
    error: false,
  },
};
const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentCustomer = action.payload;
      state.login.loggedIn = true;
    },
    logoutSuccess: (state, action) => {
      state.login.currentCustomer = null;
      state.login.loggedIn = false;
    },
    updateSuccess: (state, action) => {},
    updateTokenSuccess: (state, action) => {},
  },
});
export const {
  loginSuccess,
  logoutSuccess,
  updateSuccess,
  updateTokenSuccess,
} = authReducer.actions;
export default authReducer.reducer;
