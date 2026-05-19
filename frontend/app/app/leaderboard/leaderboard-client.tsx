"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Coins, Flame, Medal, MoreHorizontal, Trophy } from "lucide-react";
import { HeaderActions } from "@/components/HeaderActions";
import { apiRequest } from "@/lib/api";

type Period = "weekly" | "allTime";
type LeaderboardEntry = {
  rank: number;
  userId?: string | null;
  name: string;
  points: number;
  streak?: number;
  badge?: string;
};

const tabs: Array<{ id: Period; label: string }> = [
  { id: "weekly", label: "Peringkat Mingguan" },
  { id: "allTime", label: "Peringkat Sepanjang Masa" },
];

type LeaderboardResponse = {
  period: Period;
  top: LeaderboardEntry[];
  me: LeaderboardEntry | null;
};

const formatPoints = (points: number) => points.toLocaleString("id-ID");

export function LeaderboardClient() {
  const [period, setPeriod] = useState<Period>("weekly");
  const [leaderboards, setLeaderboards] = useState<Record<Period, LeaderboardResponse | null>>({
    weekly: null,
    allTime: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPeriods, setExpandedPeriods] = useState<Record<Period, boolean>>({
    weekly: false,
    allTime: false,
  });

  useEffect(() => {
    let active = true;

    apiRequest<LeaderboardResponse>(`/leaderboard?period=${period}&limit=100`)
      .then((payload) => {
        if (!active) return;
        setLeaderboards((current) => ({ ...current, [period]: payload }));
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Gagal memuat leaderboard.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [period]);

  const data = useMemo(() => {
    const entries = leaderboards[period]?.top || [];
    const title = period === "allTime" ? "100 Pelajar Teratas Sepanjang Masa" : "100 Pelajar Teratas Minggu Ini";

    return {
      entries,
      listTitle: title,
      me: leaderboards[period]?.me || null,
      helper:
        period === "allTime"
          ? "Kumpulkan badge dan selesaikan quiz akhir untuk mengejar peringkat sepanjang masa."
          : "Terus belajar minggu ini untuk naik peringkat!",
    };
  }, [leaderboards, period]);

  const topEntries = data.entries.slice(0, 3);
  const podium = [topEntries[1], topEntries[0], topEntries[2]].filter(Boolean);
  const isExpanded = expandedPeriods[period];
  const restEntries = data.entries.slice(3);
  const visibleRest = isExpanded ? restEntries : restEntries.slice(0, 3);
  const totalEntries = data.entries.length;

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 pb-32 text-[#f1eeee] md:px-8">
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
              onClick={() => {
                if (period === tab.id) return;
                setLoading(true);
                setError("");
                setPeriod(tab.id);
              }}
              className={`px-2 pb-3 transition ${
                active ? "border-b-2 border-primary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading && !leaderboards[period] ? (
        <div className="mt-10 rounded-xl border border-[#242020] bg-[#161313] p-8 text-center text-sm text-muted-foreground">
          Memuat leaderboard real-time...
        </div>
      ) : error ? (
        <div className="mt-10 rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center text-sm text-destructive">
          {error}
        </div>
      ) : totalEntries === 0 ? (
        <div className="mt-10 rounded-xl border border-[#242020] bg-[#161313] p-8 text-center text-sm text-muted-foreground">
          Belum ada pengguna di leaderboard. Selesaikan quiz atau modul untuk menjadi yang pertama.
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 items-end gap-4 md:grid-cols-3">
            {podium.map((person) => (
              <PodiumCard key={`${period}-${person.rank}`} person={person} />
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[#242020] bg-[#161313] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Trophy className="h-4 w-4 text-primary" />
              {data.listTitle}
            </div>
            <div className="divide-y divide-border">
              {visibleRest.map((person) => (
                <LeaderboardRow key={`${period}-${person.rank}-${person.userId || person.name}`} person={person} />
              ))}
            </div>
            {restEntries.length > 3 && (
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setExpandedPeriods((current) => ({ ...current, [period]: !current[period] }))}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-border bg-secondary/70 px-4 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label={isExpanded ? `Tutup daftar lengkap ${data.listTitle}` : `Lihat semua ${totalEntries} pelajar di ${data.listTitle}`}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Tampilkan lebih sedikit
                    </>
                  ) : (
                    <>
                      <MoreHorizontal className="h-4 w-4" />
                      Lihat semua {totalEntries} pelajar
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 border-t border-[#242020] bg-[#161313]/95 px-6 py-3 backdrop-blur md:left-64 md:px-8">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex min-w-0 items-center gap-4">
            <span className="rounded-md border border-border bg-secondary px-3 py-1 text-xs">
              {data.me ? `Peringkat #${data.me.rank}` : "Belum masuk peringkat"}
            </span>
            <div className="h-7 w-7 flex-none rounded-full bg-secondary" />
            <div className="min-w-0">
              <div className="font-medium">Anda</div>
              <div className="truncate text-xs text-muted-foreground">{data.helper}</div>
            </div>
          </div>
          <div className="flex flex-none items-center gap-1 font-display text-lg font-bold text-accent">
            <Coins className="h-4 w-4" /> {formatPoints(data.me?.points || 0)} FinPoin
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ person }: { person: LeaderboardEntry }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
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
        isFirst ? "border-primary/50 bg-primary/10 shadow-glow md:pb-7 md:pt-7" : "border-[#242020] bg-[#161313]"
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
      {Boolean(person.streak) && (
        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-accent">
          <Flame className="h-3 w-3" fill="currentColor" />
          {person.streak} Hari Beruntun
        </div>
      )}
      {person.badge && <div className="mt-1 text-[10px] text-primary">{person.badge}</div>}
    </div>
  );
}
