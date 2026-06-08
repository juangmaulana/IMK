"use client";

import { useEffect, useState } from "react";
import { Snowflake, Shield, Lock, Rocket, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderActions } from "@/components/HeaderActions";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

const items = [
  { id: "streak-freeze", icon: Snowflake, name: "Pertahankan Streak", desc: "Pertahankan streak Anda meskipun melewatkan satu hari. Penting untuk pembelajaran konsisten.", price: 500 },
  { id: "badge-slot", icon: Shield, name: "Slot Lencana Profil", desc: "Buka slot tambahan untuk memamerkan pencapaian Anda kepada komunitas.", price: 1200 },
  { id: "point-shield", icon: Lock, name: "Perisai Pelindung", desc: "Lindungi poin Anda dari penurunan peringkat selama 48 jam. Amankan posisi Anda.", price: 750 },
  { id: "point-booster", icon: Rocket, name: "Pengganda FinPoin", desc: "Dapatkan 2x FinPoin untuk 3 modul berikutnya. Percepat hadiah Anda.", price: 1000 },
];

export default function StorePage() {
  const [balance, setBalance] = useState(0);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ itemId: string; message: string; ok: boolean } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBalance(Number(localStorage.getItem("totalPoints") || 0));
    }, 0);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        const syncedUser = syncUserToLocalStorage(user);
        setBalance(syncedUser.points);
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika API belum tersedia.
      });

    return () => window.clearTimeout(timer);
  }, []);

  const handlePurchase = async (itemId: string, price: number) => {
    if (balance < price) {
      setFeedback({ itemId, message: "Saldo FinPoin tidak cukup.", ok: false });
      return;
    }

    setPurchasing(itemId);
    setFeedback(null);
    try {
      const payload = await apiRequest<{ user: ApiUser }>("/store/purchase", {
        method: "POST",
        body: JSON.stringify({ itemId }),
      });
      const syncedUser = syncUserToLocalStorage(payload.user);
      setBalance(syncedUser.points);
      setFeedback({ itemId, message: "Berhasil dibeli!", ok: true });
    } catch (err) {
      setFeedback({
        itemId,
        message: err instanceof Error ? err.message : "Pembelian gagal.",
        ok: false,
      });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-sm font-bold uppercase tracking-wider text-primary">Toko Peningkatan</h1>
        <HeaderActions />
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#242020] bg-[#161313] p-8 lg:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Persediaan Anda</h2>
          <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">Bekali diri Anda dengan alat untuk melindungi progres dan mempercepat literasi finansial Anda.</p>
        </div>
        <div className="rounded-lg border border-[#2d2725] bg-[#201b1a] p-4 text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3" /> Saldo Tersedia
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-accent">{balance.toLocaleString("id-ID")} FC</div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => {
          const canAfford = balance >= it.price;
          const isBuying = purchasing === it.id;
          const msg = feedback?.itemId === it.id ? feedback : null;
          return (
            <div key={it.id} className="rounded-xl border border-[#242020] bg-[#161313] p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#201b1a]">
                <it.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-4 font-bold">{it.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              {msg && (
                <p className={`mt-2 text-xs font-medium ${msg.ok ? "text-green-400" : "text-red-400"}`}>{msg.message}</p>
              )}
              <div className="mt-5 flex items-center justify-between rounded-md bg-[#201b1a] px-3 py-2 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!canAfford || isBuying}
                  onClick={() => handlePurchase(it.id, it.price)}
                >
                  {isBuying ? "Memproses..." : canAfford ? "Beli" : "Saldo Kurang"}
                </Button>
                <span className="flex items-center gap-1 text-muted-foreground"><Coins className="h-3 w-3" /> {it.price.toLocaleString("id-ID")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
