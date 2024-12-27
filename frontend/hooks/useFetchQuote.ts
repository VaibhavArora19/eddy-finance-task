import { QUOTE } from "@/constants/query";
import { TQuoteArgs, TQuoteResponse } from "@/types/quote";
import { useMutation } from "@tanstack/react-query";
import { _axios } from "@/config/axios";

export const useFetchQuote = () => {
  const fetchQuote = async (quoteAgrs: TQuoteArgs): Promise<Omit<TQuoteResponse, "message">> => {
    try {
      const { data } = await _axios.post<TQuoteResponse>("/quote", quoteAgrs);

      return { quote: data.quote, outputAmount: data.outputAmount };
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
