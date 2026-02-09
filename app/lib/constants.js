export const CHAIN_IDS = {
  HARDHAT: 31337,
  BASE_SEPOLIA: 84532,
  BASE: 8453,
};

export const TARGET_ETH = 3;
export const TOKEN_LIMIT = 500000;
export const TOTAL_SUPPLY = 1000000;
export const BUY_MIN = 1;
export const BUY_MAX = 10000;

export const BASE_SEPOLIA_PARAMS = {
  chainId: "0x14a34",
  chainName: "Base Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
};

export const BASE_MAINNET_PARAMS = {
  chainId: "0x2105",
  chainName: "Base",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://mainnet.base.org"],
  blockExplorerUrls: ["https://basescan.org"],
};
