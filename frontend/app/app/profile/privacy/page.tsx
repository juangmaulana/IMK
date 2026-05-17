import Link from "next/link";
import { ChevronLeft, Eye, Lock, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const privacyItems = [
  { icon: Eye, title: "Tampilkan di Leaderboard", desc: "Nama dan FinPoin Anda muncul di papan peringkat.", enabled: true },
  { icon: UserRound, title: "Profil Publik", desc: "Peserta lain dapat melihat lencana utama Anda.", enabled: true },
  { icon: Shield, title: "Mode Aman", desc: "Sembunyikan detail progres saat berbagi layar.", enabled: false },
  { icon: Lock, title: "Konfirmasi Aktivitas Sensitif", desc: "Minta konfirmasi sebelum perubahan akun penting.", enabled: true },
];

export default function PrivacyPage() {
  return (
    <div className="px-6 py-6 md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 rounded-xl border border-border bg-card p-8">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Privasi Akun</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Atur apa yang terlihat oleh komunitas dan tambahkan lapisan keamanan untuk progres belajar Anda.
        </p>
      </section>

      <div className="mt-6 space-y-4">
        {privacyItems.map((item) => (
          <div key={item.title} className="flex items-center justify-between gap-5 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-secondary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <Switch defaultChecked={item.enabled} />
          </div>
        ))}
      </div>
    </div>
  );
}
