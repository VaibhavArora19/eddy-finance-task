import { useQuery } from "@tanstack/react-query";
import client from "@/config/across";
import { TOKENS } from "@/constants/query";
import { TokenInfo } from "@across-protocol/app-sdk";

export const useFetchInputTokensList = (chainId: number) => {
  const fetchInputTokensList = async (): Promise<TokenInfo[]> => {
    const chainInfo = await client.getChainInfo(chainId);
    const inputTokens = chainInfo.inputTokens;

    return inputTokens;
  };

  return useQuery({
    enabled: !!chainId,
    queryKey: [TOKENS.FETCH_INPUT_TOKENS, chainId],
    queryFn: fetchInputTokensList,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useFetchOutputTokensList = (chainId: number) => {
  const fetchOutputTokensList = async (): Promise<TokenInfo[]> => {
    const chainInfo = await client.getChainInfo(chainId);
    const outputTokens = chainInfo.outputTokens;

    return outputTokens;
  };

  return useQuery({
    enabled: !!chainId,
    queryKey: [TOKENS.FETCH_OUTPUT_TOKENS, chainId],
    queryFn: fetchOutputTokensList,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
