import { TQuoteResponse } from "@/types/quote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  quote: TQuoteResponse["quote"] | null;
  outputAmount: string;
}

const initialState: InitialState = {
  quote: null,
  outputAmount: "0.0",
};

const acrossQuoteSlice = createSlice({
  name: "across-quote",
  initialState,
  reducers: {
    setQuote: (state, action: PayloadAction<TQuoteResponse["quote"]>) => {
      state.quote = action.payload;
    },
    setOutputAmount: (state, action: PayloadAction<string>) => {
      state.outputAmount = action.payload;
    },
  },
});

export default acrossQuoteSlice.reducer;

export const acrossQuoteActions = acrossQuoteSlice.actions;
