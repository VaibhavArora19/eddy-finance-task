import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TokenListType } from "@/types/token";
import { chainIdToImage } from "@/lib/chainIdToImage";
import { TokenInfo } from "@across-protocol/app-sdk";
import { Skeleton } from "../ui/skeleton";
import { useAcrossQuoteStore } from "@/redux/hooks";

type TProps = {
  isDisabled?: boolean;
  label: string;
  amount?: string;
  setAmount?: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenType: React.Dispatch<React.SetStateAction<TokenListType | null>>;
  chainId: number | null;
  token: TokenInfo | null;
};

const TokenInput = (props: TProps) => {
  const { outputAmount } = useAcrossQuoteStore();

  const openModal = () => {
    props.setTokenType(props?.isDisabled ? TokenListType.OUTPUT : TokenListType.INPUT);
    props.setIsModalOpen(true);
  };

  return (
    <div className="flex gap-4 w-full">
      <div className="mb-8">
        <Label htmlFor="input" className="text-gray-300">
          {props.label}
        </Label>
        <Input
          type="text"
          placeholder={props?.isDisabled ? outputAmount : props?.amount}
          disabled={props?.isDisabled ?? false}
          className="h-[4rem] w-[20rem] text-lg"
          value={props?.isDisabled ? outputAmount : props?.amount}
          onChange={(e) => {
            if (props?.setAmount) {
              props?.setAmount(e.target.value);
            }
          }}
        />
      </div>
      <Button className="h-[4rem] w-[6rem] mt-6 relative" variant={"secondary"} onClick={openModal}>
        {props.token?.logoUrl ? (
          <Image src={props?.token?.logoUrl} alt="token-icon" width={40} height={40} />
        ) : (
          <Skeleton className="h-12 w-12 rounded-full" />
        )}
        {props.chainId ? (
          <Image src={chainIdToImage(props.chainId).url} alt="token-icon" width={25} height={25} className="absolute top-8 left-12" />
        ) : (
          <Skeleton className="h-6 w-6 rounded-full absolute top-8 left-12" />
        )}
      </Button>
    </div>
  );
};

export default TokenInput;
