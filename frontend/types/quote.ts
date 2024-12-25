import { Quote } from "@across-protocol/app-sdk";

export type TQuoteArgs = {
  originChainId: number;
  destinationChainId: number;
  inputToken: string;
  outputToken: string;
  inputAmount: string;
};

export type TQuoteResponse = {
  message: string;
  quote: Quote;
};
