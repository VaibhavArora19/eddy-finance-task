import { configureStore } from "@reduxjs/toolkit";
import acrossQuoteReducer from "./features/across-quote-slice";

export const store = configureStore({
  reducer: {
    acrossQuote: acrossQuoteReducer,
  },
});
