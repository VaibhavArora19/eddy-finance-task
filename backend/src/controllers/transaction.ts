import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import { NextFunction, Request, Response } from "express";
import { CONTRACT_ADDRESS } from "../constants/index";
import { ABI } from "src/constants/abi";

const getTransactionHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address } = req.params;

    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL as string);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const filter = contract.filters.Deposit(address);

    const latestBlock = await provider.getBlockNumber();

    const events = await contract.queryFilter(filter, 289239000, latestBlock);

    const transactions: any[] = events.map((event: any) => {
      return {
        sender: event.args[0],
        recipient: event.args[1],
        originChainId: event.args[2].toString(),
        destinationChainId: event.args[3].toString(),
        inputToken: event.args[4],
        outputToken: event.args[5],
        amount: event.args[6].toString(),
        blockNumber: event.blockNumber.toString(),
      };
    });

    res.status(200).json({ message: "Transaction history fetched successfully.", transactions });
  } catch (error) {
    console.log("error :", error);
  }
};

export { getTransactionHistory };
