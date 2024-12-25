import { Request, NextFunction, Response } from "express";
import { ethers } from "ethers";
import client from "../config/across";

const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originChainId, destinationChainId, inputToken, outputToken, inputAmount } = req.body;

    if (!originChainId || !destinationChainId || !inputToken || !outputToken) {
      res.status(400).json({ message: "Missing required parameters." });
      return;
    }

    const chainInfo = await client.getChainInfo(originChainId);

    const inputTokenInfo = chainInfo.inputTokens.find((token) => ethers.getAddress(token.address) === ethers.getAddress(inputToken));

    if (!inputTokenInfo) {
      res.status(400).json({ message: "Invalid input token." });
      return;
    }

    const route = {
      originChainId,
      destinationChainId,
      inputToken: inputToken,
      outputToken: outputToken,
    };

    const quote = await client.getQuote({
      route,
      inputAmount: ethers.parseUnits(inputAmount, inputTokenInfo.decimals),
    });

    res.status(200).json({
      message: "Quote fetched successfully.",
      quote: {
        deposit: {
          ...quote.deposit,
          inputAmount: quote.deposit.inputAmount.toString(),
          outputAmount: quote.deposit.outputAmount.toString(),
        },
        limits: {
          minDeposit: quote.limits.minDeposit.toString(),
          maxDeposit: quote.limits.maxDeposit.toString(),
          maxDepositInstant: quote.limits.maxDepositInstant.toString(),
        },
        fees: {
          lpFee: quote.fees.lpFee.total.toString(),
          relayerGasFee: quote.fees.relayerGasFee.total.toString(),
          relayerCapitalFee: quote.fees.relayerCapitalFee.total.toString(),
          totalRelayFee: quote.fees.totalRelayFee.total.toString(),
        },
        isAmountTooLow: quote.isAmountTooLow,
        estimatedFillTimeSec: quote.estimatedFillTimeSec,
      },
    });
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export { getQuote };
