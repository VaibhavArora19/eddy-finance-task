import React, { useState } from "react";
import Modal from "../Modal";
import { mainnet, optimism, arbitrum, base, bsc, zksync, mode, polygon } from "viem/chains";
import { chainIdToImage } from "@/lib/chainIdToImage";
import Image from "next/image";
import { useFetchTokensList } from "@/hooks/useFetchTokenList";
import { TokenListType } from "@/types/token";

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tokenType: TokenListType;
};

const chains = [mainnet, optimism, arbitrum, base, bsc, zksync, mode, polygon];

function ChainModal(props: TProps) {
  const [currentChainId, setCurrentChainId] = useState(1);
  const { data } = useFetchTokensList(currentChainId, props.tokenType);

  const closeModal = () => props.setIsOpen(false);

  const showTokensHandler = (chainId: number) => {
    setCurrentChainId(chainId);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={closeModal}>
      <h2 className="text-xl font-semibold mb-2 ml-10 mt-4">Select chain and token</h2>
      <div className="flex gap-8 justify-center mt-8 flex-wrap px-2 pb-4">
        {chains.map((chain) => {
          return (
            <div key={chain.id} className="cursor-pointer rounded-xl border-2 border-gray-600 m-0 p-0" onClick={() => showTokensHandler(chain.id)}>
              <Image src={chainIdToImage(chain.id).url} alt={chain.name} width={60} height={60} className="p-2" />
            </div>
          );
        })}
      </div>
      <div className="overflow-y-scroll h-[28rem] w-full p-0 mt-4">
        {data &&
          data?.map((token) => {
            return (
              <div key={token.address} className="flex gap-4 border-b-2 border-gray-900 mb-4 cursor-pointer">
                <div className="pl-8">
                  <Image src={token.logoUrl} alt={token.name} width={60} height={60} className="p-2" />
                </div>
                <div>
                  <h2>{token.symbol}</h2>
                  <h4 className="text-slate-400">{token.name}</h4>
                </div>
              </div>
            );
          })}
      </div>
    </Modal>
  );
}

export default ChainModal;
