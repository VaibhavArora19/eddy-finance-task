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

    res.status(200).json({ quote });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export { getQuote };
