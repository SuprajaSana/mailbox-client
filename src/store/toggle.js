import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxIsVisible: false,
  number: 0,
  unreadNumber: 0,
  readNumber: 0,
  storeEmail: null,
  sentMailIsVisible: false,
  seenEmail: false,
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
    addQuantity(state, action) {
      const count = action.payload;
      state.number = state.number + count;
    },
    readEmails(state, action) {
      const count = action.payload;
      if (count > 0) {
        state.readNumber = count - 1;
      }
    },
    storeEmail(state, action) {
      state.storeEmail = action.payload;
    },
    replaceCount(state, action) {
      state.unreadNumber = action.payload;
    },
    makeAsUnread(state) {
      state.seenEmail = !state.seenEmail;
    }
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;
