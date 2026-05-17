import type { Metadata } from "next";
import { LeaderboardClient } from "./leaderboard-client";

export const metadata: Metadata = {
  title: "FINLIT - Leaderboard",
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
