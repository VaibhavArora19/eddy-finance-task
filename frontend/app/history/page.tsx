"use client";

import { HistoryTable } from "@/components/HistoryTable/HistoryTable";
import { useFetchTransactionHistory } from "@/hooks/useFetchTransactionHistory";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function History() {
  const [address, setAddress] = useState("");
  const { data: transactions } = useFetchTransactionHistory(address);

  console.log("address is: ", address);
  console.log("data is; ", transactions);

  useEffect(() => {
    async function getWalletAddress() {
      //@ts-expect-error metamask might not be available
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const wallet = await signer.getAddress();

      setAddress(wallet);
    }

    getWalletAddress();
  }, []);

  return <div>{transactions && <HistoryTable transactions={transactions} />}</div>;
}
