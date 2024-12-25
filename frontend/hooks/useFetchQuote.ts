import { QUOTE } from "@/constants/query";
import { TQuoteArgs, TQuoteResponse } from "@/types/quote";
import { useMutation } from "@tanstack/react-query";
import { _axios } from "@/config/axios";
import { Quote } from "@across-protocol/app-sdk";

export const useFetchQuote = () => {
  const fetchQuote = async (quoteAgrs: TQuoteArgs): Promise<Quote> => {
    try {
      const { data } = await _axios.post<TQuoteResponse>("/quote", quoteAgrs);

      return data.quote;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong.");
    }
  };

  return useMutation({
    mutationKey: [QUOTE.FETCH_QUOTE],
    mutationFn: fetchQuote,
  });
};
