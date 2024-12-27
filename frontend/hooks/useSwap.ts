import { CONTRACT_ADDRESS } from "@/constants";
import { ABI } from "@/constants/abi";
import { ethers, TransactionReceipt } from "ethers";
import { useAppDispatch } from "@/redux/hooks";
import { transactionStatusActions } from "@/redux/actions";
import { erc20Abi } from "viem";

const useSwap = () => {
  const dispatch = useAppDispatch();

  const swap = async (
    inputToken: string,
    outputToken: string,
    inputAmount: string,
    outputAmount: string,
    destinationChainId: number,
    exclusiveRelayer: string,
    quoteTimestamp: number,
    exclusivityDeadline: number
  ) => {
    try {
      //@ts-expect-error metamask might not be available
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      const erc20Contract = new ethers.Contract(inputToken, erc20Abi, signer);

      const approvalTx = await erc20Contract.approve(CONTRACT_ADDRESS, inputAmount);

      await approvalTx.wait();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.deposit(
        address,
        inputToken,
        outputToken,
        inputAmount,
        outputAmount,
        destinationChainId,
        exclusiveRelayer,
        quoteTimestamp,
        exclusivityDeadline,
        {
          gasLimit: "200000",
        }
      );

      console.log("tx is", tx);
      const transactionReceipt: TransactionReceipt = await tx.wait();

      console.log("transactionReceipt is", transactionReceipt);

      const txHash = transactionReceipt.hash;

      dispatch(transactionStatusActions.setTxHash(txHash));

      return txHash;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    swap,
  };
};

export { useSwap };
