"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import InputTokenCard from "./InputTokenCard";
import OutputTokenCard from "./OutputTokenCard";
import TransactionCardTitle from "./TransactionCardTitle";
import { IoArrowDownSharp } from "react-icons/io5";
import ChainModal from "../Modal/ChainModal/ChainModal";
import { TokenListType } from "@/types/token";
import { TokenInfo } from "@across-protocol/app-sdk";
import { useFetchQuote } from "@/hooks/useFetchQuote";
import { useAppDispatch } from "@/redux/hooks";
import { acrossQuoteActions } from "@/redux/actions";

const TransactionCard = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenType, setTokenType] = useState<TokenListType | null>(null);
  const [inputToken, setInputToken] = useState<TokenInfo | null>(null);
  const [outputToken, setOutputToken] = useState<TokenInfo | null>(null);
  const [inputChainId, setInputChainId] = useState<number | null>(null);
  const [outputChainId, setOutputChainId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const { mutateAsync: fetchQuote } = useFetchQuote();

  const handleFetchQuote = useCallback(async () => {
    if (!inputAmount || !inputChainId || !outputChainId || !inputToken || !outputToken) return;

    try {
      const data = await fetchQuote({
        originChainId: inputChainId,
        destinationChainId: outputChainId,
        inputToken: inputToken.address,
        outputToken: outputToken.address,
        inputAmount: inputAmount,
      });

      dispatch(acrossQuoteActions.setQuote(data.quote));
      dispatch(acrossQuoteActions.setOutputAmount(data.outputAmount));
    } catch (error) {
      console.log(error);
    }
  }, [inputAmount, inputChainId, outputChainId, inputToken, outputToken]);

  useEffect(() => {
    if (!inputAmount || !inputChainId || !outputChainId || !inputToken || !outputToken) return;

    const debouncedFunction = setTimeout(() => {
      handleFetchQuote();
    }, 1500);

    return () => clearTimeout(debouncedFunction);
  }, [inputAmount, inputChainId, outputChainId, inputToken, outputToken, handleFetchQuote]);

  return (
    <Card className="w-[30rem] m-auto mt-[10vh]">
      <TransactionCardTitle />
      <CardContent>
        <InputTokenCard
          amount={inputAmount}
          setAmount={setInputAmount}
          setIsModalOpen={setIsModalOpen}
          setTokenType={setTokenType}
          token={inputToken}
          chainId={inputChainId}
        />
        <div className="flex justify-center mr-12">
          <IoArrowDownSharp className="mb-2 text-3xl text-center" />
        </div>
        <OutputTokenCard setIsModalOpen={setIsModalOpen} setTokenType={setTokenType} chainId={outputChainId} token={outputToken} />
      </CardContent>
      <CardFooter>
        <Button className="w-[90%] h-[50px] m-auto text-xl">Swap</Button>
      </CardFooter>
      {tokenType && (
        <ChainModal
          isOpen={isModalOpen}
          setIsOpen={() => setIsModalOpen(false)}
          tokenType={tokenType}
          setToken={tokenType === TokenListType.INPUT ? setInputToken : setOutputToken}
          setChainId={tokenType === TokenListType.INPUT ? setInputChainId : setOutputChainId}
          chainId={tokenType === TokenListType.INPUT ? inputChainId : outputChainId}
        />
      )}
    </Card>
  );
};

export default TransactionCard;
