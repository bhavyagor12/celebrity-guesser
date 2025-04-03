import { createConfig, http } from "wagmi";
import { luksoTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [luksoTestnet],
  transports: {
    [luksoTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
