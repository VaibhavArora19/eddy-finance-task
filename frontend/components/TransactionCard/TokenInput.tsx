import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type TProps = {
  isDisabled?: boolean;
  label: string;
};

const TokenInput = (props: TProps) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="mb-8">
        <Label htmlFor="input" className="text-gray-300">
          {props.label}
        </Label>
        <Input type="text" placeholder="0.0" disabled={props?.isDisabled ?? false} className="h-[4rem] w-[20rem] text-lg" />
      </div>
      <Button className="h-[4rem] w-[6rem] mt-6 relative" variant={"secondary"}>
        <Image src="https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604" alt="token-icon" width={40} height={40} />
        <Image
          src="https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604"
          alt="token-icon"
          width={25}
          height={25}
          className="absolute top-8 left-12"
        />
      </Button>
    </div>
  );
};

export default TokenInput;
