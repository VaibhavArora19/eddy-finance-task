import { Deposit } from "@across-protocol/app-sdk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TState = "pending" | "filled" | "failed";

interface InitialState {
  txHash: string | null;
  currentState: TState;
  deposit?: Deposit;
}

const initialState: InitialState = {
  txHash: null,
  currentState: "pending",
};

const transactionStatusSlice = createSlice({
  name: "transaction-status",
  initialState,
  reducers: {
    setTxHash: (state, action: PayloadAction<string>) => {
      state.txHash = action.payload;
    },
    setCurrentState: (state, action: PayloadAction<TState>) => {
      state.currentState = action.payload;
    },
    setDeposit: (state, action: PayloadAction<Deposit>) => {
      state.deposit = action.payload;
    },
  },
});

export default transactionStatusSlice.reducer;

export const transactionStatusActions = transactionStatusSlice.actions;
