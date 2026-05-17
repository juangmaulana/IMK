import Link from "next/link";
import { Award, ChevronLeft, Lock, Medal, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const badges = [
  { icon: ShieldCheck, title: "Anti-Pinjol Aware", desc: "Lulus quiz akhir Anti-Pinjol.", progress: 100, earned: true },
  { icon: Medal, title: "Scam Spotter", desc: "Selesaikan modul scam digital.", progress: 70, earned: false },
  { icon: Trophy, title: "Quiz Champion", desc: "Raih skor quiz akhir di atas 80%.", progress: 45, earned: false },
  { icon: Award, title: "FINLIT Expert", desc: "Kumpulkan semua badge utama.", progress: 25, earned: false },
];

export default function BadgesPage() {
  return (
    <div className="px-6 py-6 md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 rounded-xl border border-border bg-card p-8">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Koleksi Lencana</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Lencana menunjukkan milestone belajar Anda. Selesaikan path, quiz, dan streak untuk membuka koleksi berikutnya.
        </p>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className={`rounded-xl border p-5 ${badge.earned ? "border-primary/50 bg-primary/10 shadow-glow" : "border-border bg-card"}`}>
            <div className="flex items-center justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-secondary">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              {!badge.earned && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>
            <h2 className="mt-5 font-bold">{badge.title}</h2>
            <p className="mt-1 min-h-10 text-xs text-muted-foreground">{badge.desc}</p>
            <Progress value={badge.progress} className="mt-5 h-2" />
            <div className="mt-2 text-xs font-medium text-muted-foreground">{badge.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
