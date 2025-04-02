import { lukso_provider } from "@/components/celebrity-guesser-with-providers";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { lukso, luksoTestnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: lukso,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(lukso_provider),
});

const publicClientTest = createPublicClient({
  chain: luksoTestnet,
  transport: http(),
});

const walletClientTest = createWalletClient({
  chain: luksoTestnet,
  transport: custom(lukso_provider),
});

export { publicClient, walletClient, publicClientTest, walletClientTest };
