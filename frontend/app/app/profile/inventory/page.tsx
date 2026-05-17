import Link from "next/link";
import { ChevronLeft, Coins, Rocket, Shield, Snowflake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const boosts = [
  { icon: Snowflake, name: "Streak Freeze", count: 1, desc: "Melindungi streak jika melewatkan satu hari belajar." },
  { icon: Shield, name: "Perisai Poin", count: 0, desc: "Menahan penurunan peringkat selama 48 jam." },
  { icon: Rocket, name: "2x FinPoin", count: 2, desc: "Gandakan FinPoin untuk 3 modul berikutnya." },
  { icon: Zap, name: "Quiz Sprint", count: 0, desc: "Bonus kecil saat menyelesaikan quiz tanpa jeda panjang." },
];

export default function InventoryPage() {
  return (
    <div className="px-6 py-6 md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-card p-8 lg:flex-row">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">Inventaris Peningkatan</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Simpan dan gunakan boost seperti power-up belajar. Cocok untuk menjaga momentum saat mengejar badge.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/40 p-4 text-right">
          <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3" /> Saldo Tersedia
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-accent">3.450 FC</div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {boosts.map((boost) => (
          <div key={boost.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary">
                <boost.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-md border border-border bg-secondary px-2 py-1 text-xs font-bold">x{boost.count}</span>
            </div>
            <h2 className="mt-5 font-bold">{boost.name}</h2>
            <p className="mt-1 min-h-10 text-xs text-muted-foreground">{boost.desc}</p>
            <Button className="mt-5 w-full" size="sm" disabled={boost.count === 0}>
              {boost.count > 0 ? "Gunakan" : "Tidak Tersedia"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
