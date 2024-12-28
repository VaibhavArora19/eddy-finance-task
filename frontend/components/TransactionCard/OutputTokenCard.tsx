import { TokenListType } from "@/types/token";
import TokenInput from "./TokenInput";
import { TokenInfo } from "@across-protocol/app-sdk";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
  chainId: number | null;
  token: TokenInfo | null;
};

//Token output component that allows the user to select a token to receive from the list of tokens available on the chain
const OutputTokenCard = (props: TProps) => {
  return (
    <TokenInput
      isDisabled={true}
      label="To"
      setIsModalOpen={props.setIsModalOpen}
      setTokenType={props.setTokenType}
      chainId={props.chainId}
      token={props.token}
    />
  );
};

export default OutputTokenCard;
