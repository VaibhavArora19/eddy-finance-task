import { CONTRACT_ADDRESS } from "@/constants";
import { ABI } from "@/constants/abi";
import { ethers, TransactionReceipt } from "ethers";
import { useAppDispatch } from "@/redux/hooks";
import { transactionStatusActions } from "@/redux/actions";

const useSwap = () => {
  const dispatch = useAppDispatch();

  const swap = async (
    inputToken: string,
    outputToken: string,
    inputAmount: string,
    outputAmount: string,
    destinationChainId: number,
    exclusiveRelayer: string,
    quoteTimestamp: number
  ) => {
    //@ts-expect-error metamask might not be available
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const address = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const tx = await contract.deposit(
      address,
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      destinationChainId,
      exclusiveRelayer,
      quoteTimestamp
    );

    const transactionReceipt: TransactionReceipt = await tx.wait();

    const txHash = transactionReceipt.hash;

    dispatch(transactionStatusActions.setTxHash(txHash));

    return txHash;
  };

  return {
    swap,
  };
};

export { useSwap };
