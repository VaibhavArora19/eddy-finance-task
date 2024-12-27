import client from "@/config/across";
import { TRANSACTION } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

const useFetchTransactionStatus = (originChainId: number, destinationChainId: number, depositTxHash: string) => {
  const fetchTransactionStatus = async () => {
    const status = await client.getDeposit({
      findBy: {
        originChainId: originChainId,
        destinationChainId: destinationChainId,
        depositTxHash: depositTxHash as `0x${string}`,
      },
    });

    return status;
  };

  return useQuery({
    enabled: !!originChainId && !!destinationChainId && !!depositTxHash,
    queryKey: [TRANSACTION.GET_STATUS, originChainId, destinationChainId, depositTxHash],
    queryFn: fetchTransactionStatus,
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });
};

export default useFetchTransactionStatus;
