import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { CelebrityAppWithProviders } from "@/components/celebrity-guesser-with-providers";
import "@rainbow-me/rainbowkit/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess the Character",
  description: "Chat with a mystery character and try to guess who they are!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CelebrityAppWithProviders>{children}</CelebrityAppWithProviders>
      </body>
    </html>
  );
}
