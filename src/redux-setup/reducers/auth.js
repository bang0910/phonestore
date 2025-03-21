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
    updateSuccess: (state, action) => {
      state.login.currentCustomer = {
        ...state.login.currentCustomer,
        fullName:
          action.payload.fullName || state.login.currentCustomer.fullName,
        phone: action.payload.phone || state.login.currentCustomer.phone,
        address: action.payload.address || state.login.currentCustomer.address,
      };
    },
    updateTokenSuccess: (state, action) => {
      state.login.currentCustomer.accessToken = action.payload.newAccessToken;
    },
  },
});
export const {
  loginSuccess,
  logoutSuccess,
  updateSuccess,
  updateTokenSuccess,
} = authReducer.actions;
export default authReducer.reducer;
