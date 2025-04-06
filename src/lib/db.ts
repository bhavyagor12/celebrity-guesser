import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.SUPABASE_DB_URL!, { ssl: "require" });
export const db = drizzle(queryClient);
