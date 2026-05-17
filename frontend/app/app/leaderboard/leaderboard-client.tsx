"use client";

import { useMemo, useState } from "react";
import { Coins, Flame, Medal, Trophy } from "lucide-react";
import { HeaderActions } from "@/components/HeaderActions";

type Period = "weekly" | "allTime";
type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  streak?: string;
  badge?: string;
};

const weeklyTop: LeaderboardEntry[] = [
  { rank: 1, name: "Marcus T.", points: 15200, streak: "12 Minggu Beruntun" },
  { rank: 2, name: "Elena R.", points: 12450 },
  { rank: 3, name: "Sarah K.", points: 11800 },
];

const weeklyRest: LeaderboardEntry[] = [
  { rank: 4, name: "David L.", points: 10500 },
  { rank: 5, name: "Anita K.", points: 9800 },
  { rank: 6, name: "Maria G.", points: 9250 },
];

const allTimeTop: LeaderboardEntry[] = [
  { rank: 1, name: "Nadia P.", points: 184900, badge: "Grandmaster FINLIT" },
  { rank: 2, name: "Raka W.", points: 172350, badge: "Anti-Scam Expert" },
  { rank: 3, name: "Intan S.", points: 166780, badge: "Pinjol Defender" },
];

const allTimeRest: LeaderboardEntry[] = [
  { rank: 4, name: "Bima A.", points: 154420, badge: "Gold Collector" },
  { rank: 5, name: "Citra N.", points: 149600, badge: "Quiz Master" },
  { rank: 6, name: "Fajar R.", points: 141250, badge: "Risk Spotter" },
  { rank: 7, name: "Dewi L.", points: 137900, badge: "Badge Hunter" },
  { rank: 8, name: "Gilang M.", points: 132450, badge: "Consistent Learner" },
];

const tabs: Array<{ id: Period; label: string }> = [
  { id: "weekly", label: "Peringkat Mingguan" },
  { id: "allTime", label: "Peringkat Sepanjang Masa" },
];

const formatPoints = (points: number) => points.toLocaleString("id-ID");

export function LeaderboardClient() {
  const [period, setPeriod] = useState<Period>("weekly");
  const data = useMemo(() => {
    if (period === "allTime") {
      return {
        top: allTimeTop,
        rest: allTimeRest,
        listTitle: "100 Pelajar Teratas Sepanjang Masa",
        myRank: 128,
        myPoints: 28650,
        helper: "Kumpulkan badge dan selesaikan quiz akhir untuk mengejar peringkat sepanjang masa.",
      };
    }

    return {
      top: weeklyTop,
      rest: weeklyRest,
      listTitle: "100 Pelajar Teratas Minggu Ini",
      myRank: 42,
      myPoints: 3450,
      helper: "Terus belajar untuk naik peringkat!",
    };
  }, [period]);

  const podium = [data.top[1], data.top[0], data.top[2]];

  return (
    <div className="px-6 py-6 pb-32 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Peringkat FINLIT</h1>
        <HeaderActions />
      </div>

      <div className="mt-6 flex gap-6 border-b border-border text-sm">
        {tabs.map((tab) => {
          const active = period === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPeriod(tab.id)}
              className={`px-2 pb-3 transition ${
                active ? "border-b-2 border-primary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        {podium.map((person) => (
          <PodiumCard key={`${period}-${person.rank}`} person={person} />
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Trophy className="h-4 w-4 text-primary" />
          {data.listTitle}
        </div>
        <div className="divide-y divide-border">
          {data.rest.map((person) => (
            <div key={`${period}-${person.rank}`} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="flex min-w-0 items-center gap-4">
                <span className="w-4 flex-none text-muted-foreground">{person.rank}</span>
                <div className="h-7 w-7 flex-none rounded-full bg-secondary" />
                <div className="min-w-0">
                  <div className="truncate font-medium">{person.name}</div>
                  {person.badge && <div className="truncate text-xs text-muted-foreground">{person.badge}</div>}
                </div>
              </div>
              <span className="flex-none text-muted-foreground">{formatPoints(person.points)}</span>
            </div>
          ))}
        </div>
        <div className="py-3 text-center text-muted-foreground">...</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-6 py-3 backdrop-blur md:left-64 md:px-8">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex min-w-0 items-center gap-4">
            <span className="rounded-md border border-border bg-secondary px-3 py-1 text-xs">Peringkat #{data.myRank}</span>
            <div className="h-7 w-7 flex-none rounded-full bg-secondary" />
            <div className="min-w-0">
              <div className="font-medium">Anda</div>
              <div className="truncate text-xs text-muted-foreground">{data.helper}</div>
            </div>
          </div>
          <div className="flex flex-none items-center gap-1 font-display text-lg font-bold text-accent">
            <Coins className="h-4 w-4" /> {formatPoints(data.myPoints)} FinPoin
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ person }: { person: LeaderboardEntry }) {
  const isFirst = person.rank === 1;
  const rankClass =
    person.rank === 1
      ? "bg-primary text-primary-foreground"
      : person.rank === 2
        ? "bg-muted-foreground/40 text-foreground"
        : "bg-accent text-accent-foreground";

  return (
    <div
      className={`rounded-xl border p-5 text-center ${
        isFirst ? "border-primary/50 bg-primary/10 shadow-glow md:pb-7 md:pt-7" : "border-border bg-card"
      }`}
    >
      <div className={`mx-auto -mt-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${rankClass}`}>
        {person.rank}
      </div>
      <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
        {isFirst ? <Trophy className="h-7 w-7 text-primary-foreground" /> : <Medal className="h-6 w-6 text-primary-foreground" />}
      </div>
      <div className="mt-3 font-bold">{person.name}</div>
      <div className="text-xs text-muted-foreground">{formatPoints(person.points)} FinPoin</div>
      {person.streak && (
        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-accent">
          <Flame className="h-3 w-3" fill="currentColor" />
          {person.streak}
        </div>
      )}
      {person.badge && <div className="mt-1 text-[10px] text-primary">{person.badge}</div>}
    </div>
  );
}
