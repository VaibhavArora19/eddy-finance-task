import { AppDispatch, RootState } from "@/types/redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAcrossQuoteStore = () => useAppSelector((state) => state.acrossQuote);

export const useTransactionStatusStore = () => useAppSelector((state) => state.transactionStatus);
