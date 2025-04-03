import { lukso_contract_dets } from "@/contracts/lukso";
import { createWalletClient, http, encodeFunctionData } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { luksoTestnet } from "viem/chains";

type ResolveGameResponse = { hash: string };


if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is not set.");
}

const account = privateKeyToAccount(process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
  account,
  chain: luksoTestnet,
  transport: http(),
});

export async function resolveGame(
  player: `0x${string}`,
  won: boolean,
  category: string,
): Promise<ResolveGameResponse> {
  try {
    const txHash = await walletClient.sendTransaction({
      account,
      to: lukso_contract_dets.contractAddress as `0x${string}`,
      data: encodeFunctionData({
        abi: lukso_contract_dets.abi,
        functionName: "resolveGame",
        args: [player, won, category],
      }),
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
