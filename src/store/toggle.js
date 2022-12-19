import { createSlice } from "@reduxjs/toolkit";

const initQuant = localStorage.getItem("emails");

const initialState = {
  inboxIsVisible: false,
  number: initQuant,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.inboxIsVisible = !state.inboxIsVisible;
    },
    addQuantity(state) {
      state.number = state.number + 1;
      localStorage.setItem("emails", state.number);
    },
    readEmails(state) {
      state.number = state.number - 1;
    },
    removeNumber(state) {
      state.number = state.number - 1;
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;
