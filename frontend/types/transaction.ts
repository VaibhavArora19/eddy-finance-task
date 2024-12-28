export type TTransactionHistory = {
  sender: string;
  recipient: string;
  originChainId: string;
  destinationChainId: string;
  inputToken: string;
  outputToken: string;
  amount: string;
  blockNumber: string;
};
