export const chainIdToImage = (chainId: number) => {
  switch (chainId) {
    case 1:
      return {
        chainId: 1,
        url: "/chains/ethereum.png",
      };
    case 42161:
      return {
        chainId: 42161,
        url: "/chains/arbitrum.png",
      };
    case 137:
      return {
        chainId: 137,
        url: "/chains/polygon.png",
      };
    case 10:
      return {
        chainId: 10,
        url: "/chains/optimism.png",
      };
    case 56:
      return {
        chainId: 56,
        url: "/chains/bsc.png",
      };
    case 8453:
      return {
        chainId: 8453,
        url: "/chains/base.png",
      };
    case 324:
      return {
        chainId: 324,
        url: "/chains/zksync.png",
      };
    case 34443:
      return {
        chainId: 34443,
        url: "/chains/mode.png",
      };
    default:
      return {
        chainId: 34443,
        url: "/chains/mode.png",
      };
  }
};
