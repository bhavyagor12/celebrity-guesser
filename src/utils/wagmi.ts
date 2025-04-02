import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { baseSepolia, lukso, luksoTestnet } from "wagmi/chains";
const projectId = "xsdfss";
export const config = getDefaultConfig({
  appName: "Create Wagmi",
  projectId,
  chains: [baseSepolia, luksoTestnet, lukso],
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
