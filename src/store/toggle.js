import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inboxIsVisible: false,
    number: 0,
    emails:[]
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.inboxIsVisible = !state.inboxIsVisible;
      },
      addQuantity(state) {
          state.number++
    },
    readEmails(state) {
      state.number--
    },
      storeEmail(state, action) {
          state.emails = action.payload
          console.log(state.emails)
      }
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;
