import { createSlice } from "@reduxjs/toolkit";

const initQuant = localStorage.getItem("emails");
const initShowEmail = localStorage.getItem("emailSeen");

const initialState = {
  inboxIsVisible: false,
  number: initQuant,
  emailSeen: false,
  sentMailIsVisible: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.inboxIsVisible = !state.inboxIsVisible;
    },
    toggleSentMail(state) {
      state.sentMailIsVisible = !state.sentMailIsVisible;
    },
    addQuantity(state) {
      state.number = state.number + 1;
      state.emailSeen = false;
      localStorage.setItem("emails", state.number);
      //localStorage.setItem("emailSeen", state.emailSeen);
    },
    readEmails(state) {
      state.number = state.number - 1;
      state.emailSeen = true;
      localStorage.setItem("emails", state.number);
      //localStorage.setItem("emailSeen", state.emailSeen);
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;
