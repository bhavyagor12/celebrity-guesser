import { lukso_provider } from "@/components/celebrity-guesser-with-providers";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { lukso } from "viem/chains";

const publicClient = createPublicClient({
  chain: lukso,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(lukso_provider),
});

export { publicClient, walletClient };
