import { TokenListType } from "@/types/token";
import TokenInput from "./TokenInput";

type TProps = {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
};

const InputTokenCard = (props: TProps) => {
  return (
    <TokenInput
      label="From"
      amount={props.amount}
      setAmount={props.setAmount}
      setIsModalOpen={props.setIsModalOpen}
      setTokenType={props.setTokenType}
    />
  );
};

export default InputTokenCard;
