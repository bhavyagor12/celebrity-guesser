import AIChat from "@/components/ai-chat";
import CategoryChips from "@/components/category-chips";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-xl md:text-4xl font-bold text-center mb-8">
          Guess the Character
        </h1>
        <p className="text-center mb-8 text-muted-foreground">
          Chat with a mystery character and try to guess who they are! If you
          succeed, you&apos;ll be rewarded with a onchain reward.
          Dont leave the game or else the game resets in 3 times and your stakes are lost.
        </p>
        <CategoryChips />
        <AIChat />
      </div>
    </main>
  );
}
