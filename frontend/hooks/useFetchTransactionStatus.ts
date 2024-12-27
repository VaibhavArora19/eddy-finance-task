import client from "@/config/across";
import { TRANSACTION } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { transactionStatusActions } from "@/redux/actions";

const useFetchTransactionStatus = (originChainId: number | undefined, destinationChainId: number | undefined, depositTxHash: string | null) => {
  const dispatch = useAppDispatch();

  const fetchTransactionStatus = async () => {
    if (!originChainId || !destinationChainId || !depositTxHash) return;

    const status = await client.getDeposit({
      findBy: {
        originChainId: originChainId,
        destinationChainId: destinationChainId,
        depositTxHash: depositTxHash as `0x${string}`,
      },
    });

    dispatch(transactionStatusActions.setCurrentState(status.status));
    dispatch(transactionStatusActions.setDeposit(status));

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
