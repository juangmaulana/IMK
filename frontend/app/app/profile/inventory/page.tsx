"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Coins, Rocket, Shield, Snowflake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

const BOOST_DEFS = [
  { id: "streak-freeze", icon: Snowflake, name: "Streak Freeze", desc: "Melindungi streak jika melewatkan satu hari belajar." },
  { id: "point-shield", icon: Shield, name: "Perisai Poin", desc: "Menahan penurunan peringkat selama 48 jam." },
  { id: "point-booster", icon: Rocket, name: "2x FinPoin", desc: "Gandakan FinPoin untuk 3 modul berikutnya." },
  { id: "badge-slot", icon: Zap, name: "Slot Lencana", desc: "Buka slot tambahan untuk memamerkan pencapaian." },
];

export default function InventoryPage() {
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBalance(Number(localStorage.getItem("totalPoints") || 0));
    }, 0);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        const syncedUser = syncUserToLocalStorage(user);
        setBalance(syncedUser.points);
        setInventory(user.inventory || {});
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika API belum tersedia.
      });

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#242020] bg-[#161313] p-8 lg:flex-row">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">Inventaris Peningkatan</h1>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
            Simpan dan gunakan boost seperti power-up belajar. Cocok untuk menjaga momentum saat mengejar badge.
          </p>
        </div>
        <div className="rounded-lg border border-[#2d2725] bg-[#201b1a] p-4 text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3" /> Saldo Tersedia
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-accent">{balance.toLocaleString("id-ID")} FC</div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {BOOST_DEFS.map((boost) => {
          const count = Number(inventory[boost.id] || 0);
          return (
            <div key={boost.id} className="rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#201b1a]">
                  <boost.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="rounded-md border border-[#2d2725] bg-[#201b1a] px-2 py-1 text-xs font-bold">x{count}</span>
              </div>
              <h2 className="mt-5 font-bold">{boost.name}</h2>
              <p className="mt-1 min-h-10 text-sm leading-relaxed text-muted-foreground">{boost.desc}</p>
              <Button className="mt-5 w-full" size="sm" disabled={count === 0}>
                {count > 0 ? "Gunakan" : "Tidak Tersedia"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
