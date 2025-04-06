// app/api/leaderboard/update/route.ts
import { db } from "@/lib/db";
import { leaderboard } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { wallet, won } = await req.json();
  const user = await db
    .select()
    .from(leaderboard)
    .where(eq(leaderboard.walletAddress, wallet))
    .then((res) => res[0]);

  const isWin = won === true;

  if (user) {
    await db
      .update(leaderboard)
      .set({
        gamesPlayed: user.gamesPlayed + 1,
        wins: user.wins + (isWin ? 1 : 0),
        currentStreak: isWin ? user.currentStreak + 1 : 0,
        lastPlayed: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(leaderboard.walletAddress, wallet));
  } else {
    await db.insert(leaderboard).values({
      walletAddress: wallet,
      gamesPlayed: 1,
      wins: isWin ? 1 : 0,
      currentStreak: isWin ? 1 : 0,
      lastPlayed: new Date(),
    });
  }

  return NextResponse.json({ success: true });
}
