"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils/wagmi";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/sonner";
import { GameProvider } from "./game-context";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createClientUPProvider } from "@lukso/up-provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lukso_provider: any;

if (typeof window !== "undefined") {
  lukso_provider = createClientUPProvider();
}

export { lukso_provider };
const CelebrityApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <GameProvider>{children}</GameProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const CelebrityAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <CelebrityApp>{children}</CelebrityApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
