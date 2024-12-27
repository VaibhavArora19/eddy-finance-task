"use client";

import StatusCard from "@/components/StatusCard/StatusCard";
import TransactionCard from "@/components/TransactionCard/TransactionCard";
import useFetchTransactionStatus from "@/hooks/useFetchTransactionStatus";
import { useAcrossQuoteStore, useTransactionStatusStore } from "@/redux/hooks";

export default function Home() {
  const { txHash, currentState, deposit } = useTransactionStatusStore();
  const { quote } = useAcrossQuoteStore();
  const { error } = useFetchTransactionStatus(quote?.deposit.originChainId, quote?.deposit.destinationChainId, txHash);

  if (error) {
    console.log("error occured: ", error);
  }

  return (
    <div className="flex justify-center gap-6">
      <TransactionCard />
      {txHash && <StatusCard txHash={txHash} currentState={currentState} deposit={deposit} />}
    </div>
  );
}
