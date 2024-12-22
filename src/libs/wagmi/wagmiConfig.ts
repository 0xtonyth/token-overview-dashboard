"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { mainnet, optimism, polygon, avalanche, arbitrum } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_API_KEY || "";

const supportedChains: Chain[] = [
  mainnet,
  optimism,
  polygon,
  avalanche,
  arbitrum,
];

export const wagmiConfig = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
