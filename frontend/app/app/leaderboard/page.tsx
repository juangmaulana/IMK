import type { Metadata } from "next";
import { Coins } from "lucide-react";

export const metadata: Metadata = {
  title: "FINLIT — Leaderboard",
};

const top3 = [
  { rank: 2, name: "Elena R.", points: "12,450" },
  { rank: 1, name: "Marcus T.", points: "15,200", streak: "12 Minggu Beruntun" },
  { rank: 3, name: "Sarah K.", points: "11,800" },
];

const rest = [
  { rank: 4, name: "David L.", pts: "10,500" },
  { rank: 5, name: "Anita K.", pts: "9,800" },
  { rank: 6, name: "Maria G.", pts: "9,250" },
];

export default function LeaderboardPage() {
  return (
    <div className="px-6 py-6 pb-32 md:px-8">
      <h1 className="text-xl font-bold">Peringkat FINLIT</h1>

      <div className="mt-6 flex gap-6 border-b border-border text-sm">
        <button className="border-b-2 border-primary px-2 pb-3 font-medium">Peringkat Mingguan</button>
        <button className="px-2 pb-3 text-muted-foreground">Peringkat Sepanjang Masa</button>
      </div>

      <div className="mt-10 grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        {top3.map((p) => {
          const isFirst = p.rank === 1;
          return (
            <div
              key={p.rank}
              className={`rounded-xl border p-5 text-center ${isFirst ? "border-primary/50 bg-primary/10 shadow-glow" : "border-border bg-card"}`}
            >
              <div className={`mx-auto -mt-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${isFirst ? "bg-primary text-primary-foreground" : p.rank === 2 ? "bg-muted-foreground/40" : "bg-accent text-accent-foreground"}`}>
                {p.rank}
              </div>
              <div className="mx-auto mt-3 h-16 w-16 rounded-full bg-gradient-primary" />
              <div className="mt-3 font-bold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.points} FinPoin</div>
              {p.streak && <div className="mt-1 text-[10px] text-accent">🔥 {p.streak}</div>}
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-5">
        <div className="mb-3 text-sm font-medium">100 Pelajar Teratas</div>
        <div className="divide-y divide-border">
          {rest.map((r) => (
            <div key={r.rank} className="flex items-center justify-between py-3 text-sm">
              <div className="flex items-center gap-4">
                <span className="w-4 text-muted-foreground">{r.rank}</span>
                <div className="h-7 w-7 rounded-full bg-secondary" />
                <span>{r.name}</span>
              </div>
              <span className="text-muted-foreground">{r.pts}</span>
            </div>
          ))}
        </div>
        <div className="py-3 text-center text-muted-foreground">···</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-6 py-3 backdrop-blur md:left-64 md:px-8">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="rounded-md border border-border bg-secondary px-3 py-1 text-xs">Peringkat #42</span>
            <div className="h-7 w-7 rounded-full bg-secondary" />
            <div>
              <div className="font-medium">Anda</div>
              <div className="text-xs text-muted-foreground">Terus belajar untuk naik peringkat!</div>
            </div>
          </div>
          <div className="flex items-center gap-1 font-display text-lg font-bold text-accent">
            <Coins className="h-4 w-4" /> 3,450 FinPoin
          </div>
        </div>
      </div>
    </div>
  );
}
