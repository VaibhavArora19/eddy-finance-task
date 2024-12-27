import { Card, CardContent } from "../ui/card";
import StatusCardTitle from "./StatusCardTitle";
import { useFetchTokensList } from "@/hooks/useFetchTokenList";
import { TokenListType } from "@/types/token";
import { ethers } from "ethers";
import Image from "next/image";
import { chainIdToImage } from "@/lib/chainIdToImage";
import { TiArrowRight } from "react-icons/ti";
import { Deposit } from "@across-protocol/app-sdk";

type TProps = {
  txHash: string;
  currentState: string;
  deposit?: Deposit;
};

function StatusCard({ txHash, currentState, deposit }: TProps) {
  const { data: inputTokens } = useFetchTokensList(deposit?.originChainId, TokenListType.INPUT);
  const { data: outputTokens } = useFetchTokensList(deposit?.destinationChainId, TokenListType.OUTPUT);

  return (
    <Card className="w-[24rem] h-[31rem] mt-[12vh]">
      <StatusCardTitle />
      <CardContent>
        <div>
          <div>
            <h1 className="mb-2">Status: </h1>
            <h2
              className={`${
                currentState === "pending" ? "bg-yellow-600" : currentState === "filled" ? "bg-green-600" : "bg-red-600"
              } mt-2 w-[80px] h-[30px] rounded-xl text-center`}
            >
              {currentState}
            </h2>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <div>
              <h1>Source Tx Hash: </h1>
              <h2>{txHash?.substring(0, 6) + "..." + txHash?.substring(txHash.length - 6)}</h2>
            </div>
            <div>
              <h1>Destination Tx Hash: </h1>
              <h2>
                {deposit?.fillTxHash
                  ? deposit?.fillTxHash.substring(0, 6) + "..." + deposit?.fillTxHash?.substring(deposit?.fillTxHash.length - 6)
                  : "..."}
              </h2>
            </div>
          </div>
          <h1 className="mt-8">Tokens transferred:</h1>
          <div className="pl-[1px]">
            <div className="flex gap-4">
              <div>
                <h2>
                  {deposit?.inputToken && inputTokens ? (
                    <Image
                      src={inputTokens.find((token) => ethers.getAddress(token.address) === ethers.getAddress(deposit?.inputToken))?.logoUrl ?? ""}
                      alt={"Input token"}
                      width={40}
                      height={40}
                      className="p-2"
                    />
                  ) : (
                    "..."
                  )}
                </h2>
              </div>
              <TiArrowRight className="mt-2" />
              <div>
                <h2>
                  {deposit?.outputToken && outputTokens ? (
                    <Image
                      src={outputTokens.find((token) => ethers.getAddress(token.address) === ethers.getAddress(deposit?.outputToken))?.logoUrl ?? ""}
                      alt={"output token"}
                      width={40}
                      height={40}
                      className="p-2"
                    />
                  ) : (
                    "..."
                  )}
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <h1>Chains: </h1>
              <div className="flex gap-4">
                <div>
                  {deposit?.originChainId ? (
                    <Image src={chainIdToImage(deposit?.originChainId).url} alt={"chain"} width={40} height={40} className="p-2" />
                  ) : (
                    "..."
                  )}
                </div>
                <TiArrowRight className="mt-2" />
                <div>
                  {deposit?.destinationChainId ? (
                    <Image src={chainIdToImage(deposit?.destinationChainId).url} alt={"chain"} width={40} height={40} className="p-2" />
                  ) : (
                    "..."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatusCard;
