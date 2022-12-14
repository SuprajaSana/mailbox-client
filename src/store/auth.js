import { createSlice } from "@reduxjs/toolkit";

const initToken = localStorage.getItem("token");
const initEmail = localStorage.getItem("email");

const initialAuthState = {
  isAuthenticated: false,
  email: initEmail,
  token: initToken,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload;
      localStorage.setItem("email", state.email);
    },
    loginToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
