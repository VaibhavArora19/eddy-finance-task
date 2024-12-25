import { TokenListType } from "@/types/token";
import TokenInput from "./TokenInput";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
};

const OutputTokenCard = (props: TProps) => {
  return <TokenInput isDisabled={true} label="To" setIsModalOpen={props.setIsModalOpen} setTokenType={props.setTokenType} />;
};

export default OutputTokenCard;
