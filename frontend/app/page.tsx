import { AppShell } from "@/components/AppShell";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <AppShell>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-6 animate-fade-in">
            Belajar Keuangan Aman & Cerdas
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-balance">
            Lindungi Dirimu dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Pinjol Ilegal</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Penipuan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl text-balance">
            Platform edukasi gamifikasi untuk mempelajari cara mengenali, menghindari, dan menangani risiko finansial digital di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full shadow-glow">
              <Link href="/login">Mulai Belajar Sekarang</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/app/paths">Lihat Kurikulum</Link>
            </Button>
          </div>
        </main>

        <section className="bg-secondary/30 p-12 lg:p-24 rounded-t-3xl border-t mt-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Simulasi Realistis</h3>
              <p className="text-muted-foreground text-sm">Berlatih menghadapi skenario penipuan dan jebakan pinjol langsung dari dunia nyata.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Gamifikasi</h3>
              <p className="text-muted-foreground text-sm">Dapatkan poin, naik level, dan bersaing di Leaderboard untuk memotivasi belajarmu.</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary text-2xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Materi Terstruktur</h3>
              <p className="text-muted-foreground text-sm">Jalur pembelajaran lengkap dari dasar hingga tindakan hukum yang terarah.</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
