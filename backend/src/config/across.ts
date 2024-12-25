import { createAcrossClient } from "@across-protocol/app-sdk";
import { mainnet, optimism, arbitrum, base, polygon, bsc, zksync } from "viem/chains";

const client = createAcrossClient({
  integratorId: "0xdead", // 2-byte hex string
  chains: [mainnet, optimism, arbitrum, base, polygon, bsc, zksync],
});

export default client;
