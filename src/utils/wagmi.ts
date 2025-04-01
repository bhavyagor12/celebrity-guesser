import { http, createConfig } from "wagmi";
import { baseSepolia, lukso, luksoTestnet } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia, luksoTestnet, lukso],
  connectors: [
    coinbaseWallet({
      appName: "Create Wagmi",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [lukso.id]: http(),
    [luksoTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
