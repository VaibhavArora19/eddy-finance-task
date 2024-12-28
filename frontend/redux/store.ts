import { configureStore } from "@reduxjs/toolkit";
import acrossQuoteReducer from "./features/across-quote-slice";
import transactionStatusReducer from "./features/transaction-status-slice";

//redux store
export const store = configureStore({
  reducer: {
    acrossQuote: acrossQuoteReducer,
    transactionStatus: transactionStatusReducer,
  },
});
