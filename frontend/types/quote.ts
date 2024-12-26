import { Address, Hex } from "viem";

export type TQuoteArgs = {
  originChainId: number;
  destinationChainId: number;
  inputToken: string;
  outputToken: string;
  inputAmount: string;
};

export type TQuoteResponse = {
  message: string;
  outputAmount: string;
  quote: {
    deposit: {
      inputAmount: string;
      outputAmount: string;
      recipient: Address;
      message: Hex;
      quoteTimestamp: number;
      exclusiveRelayer: Address;
      exclusivityDeadline: number;
      spokePoolAddress: Address;
      destinationSpokePoolAddress: Address;
      originChainId: number;
      destinationChainId: number;
      inputToken: Address;
      outputToken: Address;
      isNative?: boolean;
    };
    limits: {
      minDeposit: string;
      maxDeposit: string;
      maxDepositInstant: string;
    };
    fees: {
      lpFee: {
        total: string;
      };
      relayerGasFee: {
        total: string;
      };
      relayerCapitalFee: {
        total: string;
      };
      totalRelayFee: {
        total: string;
      };
    };
    isAmountTooLow: boolean;
    estimatedFillTimeSec: number;
  };
};
