"use client";

import StatusCard from "@/components/StatusCard/StatusCard";
import TransactionCard from "@/components/TransactionCard/TransactionCard";
import { useTransactionStatusStore } from "@/redux/hooks";

export default function Home() {
  const { txHash } = useTransactionStatusStore();

  return (
    <div className="flex justify-center gap-6">
      <TransactionCard />
      {txHash && <StatusCard />}
    </div>
  );
}
