import { Request, NextFunction, Response } from "express";
import { ethers } from "ethers";
import client from "../config/across";
import { GetQuoteParams } from "@across-protocol/app-sdk";

const getQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originChainId, destinationChainId, inputToken, outputToken, inputAmount } = req.body;

    if (!originChainId || !destinationChainId || !inputToken || !outputToken) {
      res.status(400).json({ message: "Missing required parameters." });
      return;
    }

    const inputChainInfo = await client.getChainInfo(originChainId);

    const outputChainInfo = await client.getChainInfo(destinationChainId);

    const inputTokenInfo = inputChainInfo.inputTokens.find((token) => ethers.getAddress(token.address) === ethers.getAddress(inputToken));

    const outputTokenInfo = outputChainInfo.outputTokens.find((token) => ethers.getAddress(token.address) === ethers.getAddress(outputToken));

    if (!inputTokenInfo || !outputTokenInfo) {
      res.status(400).json({ message: "Invalid input or output token." });
      return;
    }

    const route: GetQuoteParams["route"] = {
      originChainId,
      destinationChainId,
      inputToken: inputToken,
      outputToken: outputToken,
      isNative: inputTokenInfo.symbol === "ETH",
    };

    const quote = await client.getQuote({
      route,
      inputAmount: ethers.parseUnits(inputAmount, inputTokenInfo.decimals),
    });

    console.log("deadline: ", quote.deposit.exclusivityDeadline);

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
          totalRelayFee: ethers.formatUnits(quote.fees.totalRelayFee.total.toString(), inputTokenInfo.decimals),
        },
        isAmountTooLow: quote.isAmountTooLow,
        estimatedFillTimeSec: quote.estimatedFillTimeSec,
      },
      outputAmount: ethers.formatUnits(quote.deposit.outputAmount.toString(), outputTokenInfo.decimals),
    });
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export { getQuote };
