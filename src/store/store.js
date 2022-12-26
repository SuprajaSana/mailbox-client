import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import toggleReducer from "./toggle";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toggleReducer,
  },
});

export default store;
