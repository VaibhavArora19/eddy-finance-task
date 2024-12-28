import { _axios } from "@/config/axios";
import { TRANSACTION } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useFetchTransactionHistory = (address: string) => {
  const fetchTransactionHistory = async () => {
    try {
      const { data } = await _axios.get(`/transaction/history/${address}`);

      return data.transactions;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    enabled: !!address,
    queryKey: [TRANSACTION.HISTORY, address],
    queryFn: fetchTransactionHistory,
    refetchOnWindowFocus: false,
  });
};
