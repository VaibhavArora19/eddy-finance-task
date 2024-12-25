import { useQuery } from "@tanstack/react-query";
import client from "@/config/across";
import { TOKENS } from "@/constants/query";
import { TokenInfo } from "@across-protocol/app-sdk";
import { TokenListType } from "@/types/token";

const fetchInputTokensList = async (chainId: number): Promise<TokenInfo[]> => {
  const chainInfo = await client.getChainInfo(chainId);
  const inputTokens = chainInfo.inputTokens;

  return inputTokens;
};

const fetchOutputTokensList = async (chainId: number): Promise<TokenInfo[]> => {
  const chainInfo = await client.getChainInfo(chainId);
  const outputTokens = chainInfo.outputTokens;

  return outputTokens;
};

export const useFetchTokensList = (chainId: number, type: TokenListType) => {
  const fetchTokensList = async () => {
    if (type === TokenListType.INPUT) {
      const inputTokens = await fetchInputTokensList(chainId);
      return inputTokens;
    } else {
      const outputTokens = await fetchOutputTokensList(chainId);
      return outputTokens;
    }
  };

  return useQuery({
    enabled: !!chainId && !!type,
    queryKey: [TOKENS.FETCH_TOKENS_LIST, chainId],
    queryFn: fetchTokensList,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
