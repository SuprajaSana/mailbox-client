import { createSlice } from "@reduxjs/toolkit";

const initQuant = localStorage.getItem("emails");
const initShowEmail = localStorage.getItem("emailRead");

const initialState = {
  inboxIsVisible: false,
  number: initQuant,
  showIsRead: true,
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
      localStorage.setItem("emails", state.number);
    },
    removeNumber(state) {
      state.number = state.number - 1;
    },
    showAsRead(state) {
      state.showIsRead = true;
      localStorage.setItem("emailRead", state.showIsRead);
    },
    showAsUnread(state) {
      state.showIsRead = false;
      localStorage.setItem("emailRead", state.showIsRead);
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;
