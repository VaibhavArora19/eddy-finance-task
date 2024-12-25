"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import InputTokenCard from "./InputToken";
import OutputTokenCard from "./OutputTokenCard";
import TransactionCardTitle from "./TransactionCardTitle";
import { IoArrowDownSharp } from "react-icons/io5";
import ChainModal from "../Modal/ChainModal/ChainModal";
import { TokenListType } from "@/types/token";

const TransactionCard = () => {
  const [inputAmount, setInputAmount] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenType, setTokenType] = useState<TokenListType | null>(null);
  //create modal to select the tokens and chains

  return (
    <Card className="w-[30rem] m-auto mt-[10rem]">
      <TransactionCardTitle />
      <CardContent>
        <InputTokenCard amount={inputAmount} setAmount={setInputAmount} setIsModalOpen={setIsModalOpen} setTokenType={setTokenType} />
        <div className="flex justify-center mr-12">
          <IoArrowDownSharp className="mb-2 text-3xl text-center" />
        </div>
        <OutputTokenCard setIsModalOpen={setIsModalOpen} setTokenType={setTokenType} />
      </CardContent>
      <CardFooter>
        <Button className="w-[90%] h-[50px] m-auto text-xl">Swap</Button>
      </CardFooter>
      {tokenType && <ChainModal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)} tokenType={tokenType} />}
    </Card>
  );
};

export default TransactionCard;
