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
import { useAcrossQuoteStore } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import GasEstimate from "../(ui)/GasEstimate";
import { useSwap } from "@/hooks/useSwap";

const TransactionCard = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenType, setTokenType] = useState<TokenListType | null>(null);
  const [inputToken, setInputToken] = useState<TokenInfo | null>(null);
  const [outputToken, setOutputToken] = useState<TokenInfo | null>(null);
  const [inputChainId, setInputChainId] = useState<number | null>(null);
  const [outputChainId, setOutputChainId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  //custom hook that implements fetchQuote function
  const { mutateAsync: fetchQuote, isPending } = useFetchQuote();

  // quote present in global state
  const { quote } = useAcrossQuoteStore();

  //custom hook that implements swap function
  const { swap } = useSwap();

  //*** fetch quote ***//
  //** Handle fetch quote fetches the across quote as soon as all the necessary fields are available */
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

      //* Set the quote and output amount in the global state to be used in other components
      dispatch(acrossQuoteActions.setQuote(data.quote));
      dispatch(acrossQuoteActions.setOutputAmount(data.outputAmount));
    } catch (error) {
      console.log(error);
    }
  }, [inputAmount, inputChainId, outputChainId, inputToken, outputToken]);

  //*** swap handler ***//
  //** Swap handler is called when the user clicks on the swap button and wants to perform the swap */
  const swapHandler = async () => {
    if (!quote || !inputToken || !outputToken || !inputChainId || !outputChainId) return;

    await swap(
      inputToken?.address,
      outputToken?.address,
      quote?.deposit.inputAmount,
      quote?.deposit.outputAmount,
      outputChainId,
      quote?.deposit.exclusiveRelayer,
      quote?.deposit.quoteTimestamp,
      quote?.deposit.exclusivityDeadline
    );
  };

  //*** useEffect ***//
  //* calls the fetchQuote function after all the fields are available
  useEffect(() => {
    if (!inputAmount || !inputChainId || !outputChainId || !inputToken || !outputToken) return;

    const debouncedFunction = setTimeout(() => {
      handleFetchQuote();
    }, 1500);

    return () => clearTimeout(debouncedFunction);
  }, [inputAmount, inputChainId, outputChainId, inputToken, outputToken, handleFetchQuote]);

  return (
    <Card className="w-[30rem] mt-[10vh]">
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
        <GasEstimate quote={quote} />
      </CardContent>
      <CardFooter>
        {isPending ? (
          <Button disabled className="w-[97%] h-[50px] m-auto text-xl">
            <Loader2 className="animate-spin " />
            Fetching quote
          </Button>
        ) : (
          <Button className="w-[97%] h-[50px] m-auto text-xl" disabled={quote ? false : true} onClick={swapHandler}>
            Swap
          </Button>
        )}
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
