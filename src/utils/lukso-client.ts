import { createClientUPProvider } from "@lukso/up-provider";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { lukso } from "viem/chains";

const lukso_provider = createClientUPProvider();

const publicClient = createPublicClient({
  chain: lukso,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: lukso,
  transport: custom(lukso_provider),
});

export { lukso_provider, publicClient, walletClient };
