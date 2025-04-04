import { lukso_contract_dets } from "@/contracts/lukso";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { luksoTestnet } from "viem/chains";
import { makeSVG } from "./svg";

type ResolveGameResponse = { hash: string };

if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is not set.");
}

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`,
);

const walletClient = createWalletClient({
  account,
  chain: luksoTestnet,
  transport: http(),
});

export async function resolveGame(
  player: `0x${string}`,
  won: boolean,
  category: string,
  character: string,
): Promise<ResolveGameResponse> {
  try {
    const txHash = await walletClient.writeContract({
      functionName: "resolveGame",
      address: lukso_contract_dets.contractAddress as `0x${string}`,
      abi: lukso_contract_dets.abi,
      args: [player, won, category, makeSVG(category, character)],
      chain: luksoTestnet,
    });
    console.log(
      `Game resolved for ${player}, won: ${won}, category: ${category}, txHash: ${txHash}`,
    );
    return { hash: txHash };
  } catch (error) {
    console.error("Error resolving game:", error);
    throw error;
  }
}
