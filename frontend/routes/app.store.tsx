import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Snowflake, Shield, Lock, Rocket, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/store")({
  component: StorePage,
});

const items = [
  { icon: Snowflake, name: "Pertahankan Streak", desc: "Pertahankan streak Anda meskipun melewatkan satu hari. Penting untuk pembelajaran konsisten.", price: 500 },
  { icon: Shield, name: "Slot Lencana Profil", desc: "Buka slot tambahan untuk memamerkan pencapaian Anda kepada komunitas.", price: 1200 },
  { icon: Lock, name: "Perisai Pelindung", desc: "Lindungi poin Anda dari penurunan peringkat selama 48 jam. Amankan posisi Anda.", price: 750 },
  { icon: Rocket, name: "Pengganda FinPoin", desc: "Dapatkan 2x FinPoin untuk 3 modul berikutnya. Percepat hadiah Anda.", price: 1000 },
];

function StorePage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(Number(localStorage.getItem("totalPoints") || 0));
  }, []);

  return (
    <div className="px-8 py-6">
      <h1 className="text-sm font-bold uppercase tracking-wider text-primary">Toko Peningkatan</h1>

      <div className="mt-4 flex items-start justify-between gap-6 rounded-xl border border-border bg-card p-8">
        <div>
          <h2 className="text-3xl font-bold">Persediaan Anda</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Bekali diri Anda dengan alat untuk melindungi progres dan mempercepat literasi finansial Anda.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/40 p-4 text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3" /> Saldo Tersedia
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-accent">{balance.toLocaleString()} FC</div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-xl border border-border bg-card p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
              <it.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-4 font-bold">{it.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">{it.desc}</p>
            <div className="mt-5 flex items-center justify-between rounded-md bg-secondary/40 px-3 py-2 text-sm">
              <Button variant="ghost" size="sm">Beli</Button>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Coins className="h-3 w-3" /> {it.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
