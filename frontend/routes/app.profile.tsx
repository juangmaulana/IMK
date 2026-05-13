import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, Lock, Rocket, Flame, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

const cards = [
  { icon: Bell, name: "Notifikasi", desc: "Pertahankan streak Anda meskipun melewatkan satu hari. Penting untuk pembelajaran konsisten.", cta: "Periksa" },
  { icon: Shield, name: "Koleksi Lencana", desc: "Buka slot tambahan untuk memamerkan pencapaian Anda kepada komunitas.", cta: "Pergi" },
  { icon: Lock, name: "Privasi Akun", desc: "Lindungi poin Anda dari penurunan peringkat selama 48 jam. Amankan posisi Anda.", cta: "Periksa" },
  { icon: Rocket, name: "Inventaris Peningkatan", desc: "Dapatkan 2x FinPoin untuk 3 modul berikutnya. Percepat hadiah Anda.", cta: "Periksa" },
];

function ProfilePage() {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setStreak(Number(localStorage.getItem("dailyStreak") || 0));
    setPoints(Number(localStorage.getItem("totalPoints") || 0));
  }, []);

  return (
    <div className="px-8 py-6">
      <h1 className="text-sm font-bold uppercase tracking-wider text-primary">Profil</h1>

      <div className="mt-4 flex items-start justify-between gap-6 rounded-xl border border-border bg-card p-8">
        <div>
          <h2 className="font-display text-4xl font-bold text-gradient-accent">Nama Pengguna</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Bekali diri Anda dengan alat untuk melindungi progres dan mempercepat literasi finansial Anda.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/40 p-4 text-xl font-bold flex gap-6">
          <div className="flex items-center gap-2">
            <Flame className={`h-6 w-6 ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} fill={streak > 0 ? "currentColor" : "none"} />
            <span className={streak > 0 ? "text-orange-500" : "text-muted-foreground"}>{streak}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            <Coins className="h-6 w-6" fill="currentColor" />
            <span>{points}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.name} className="rounded-xl border border-border bg-card p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
              <c.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-4 font-bold">{c.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
            <Button variant="secondary" size="sm" className="mt-5">{c.cta}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
