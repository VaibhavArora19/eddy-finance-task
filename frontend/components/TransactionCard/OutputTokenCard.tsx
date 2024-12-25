import { TokenListType } from "@/types/token";
import TokenInput from "./TokenInput";
import { TokenInfo } from "@across-protocol/app-sdk";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
  chainId: number | null;
  token: TokenInfo | null;
};

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
