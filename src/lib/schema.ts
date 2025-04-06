import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const leaderboard = pgTable("leaderboard", {
  id: uuid("id").defaultRandom().primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  gamesPlayed: integer("games_played").default(0).notNull(),
  wins: integer("wins").default(0).notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  lastPlayed: timestamp("last_played").defaultNow(),
  insertedAt: timestamp("inserted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
