import { TokenListType } from "@/types/token";
import TokenInput from "./TokenInput";
import { TokenInfo } from "@across-protocol/app-sdk";

type TProps = {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  chainId: number | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
  token: TokenInfo | null;
};

const InputTokenCard = (props: TProps) => {
  return (
    <TokenInput
      label="From"
      amount={props.amount}
      setAmount={props.setAmount}
      setIsModalOpen={props.setIsModalOpen}
      setTokenType={props.setTokenType}
      chainId={props.chainId}
      token={props.token}
    />
  );
};

export default InputTokenCard;
