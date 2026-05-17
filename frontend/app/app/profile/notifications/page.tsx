import Link from "next/link";
import { Bell, CalendarClock, ChevronLeft, Flame, ShieldAlert, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const reminders = [
  { icon: Flame, title: "Pengingat Streak", desc: "Dorongan harian agar Anda tidak kehilangan ritme belajar.", enabled: true },
  { icon: CalendarClock, title: "Jadwal Quiz", desc: "Notifikasi saat pre-quiz, mini quiz, atau quiz akhir menunggu.", enabled: true },
  { icon: Trophy, title: "Pencapaian Baru", desc: "Rayakan badge, sertifikat, dan kenaikan peringkat.", enabled: true },
  { icon: ShieldAlert, title: "Peringatan Risiko", desc: "Ringkasan singkat modus pinjol dan scam yang perlu diwaspadai.", enabled: false },
];

export default function NotificationsPage() {
  return (
    <div className="px-6 py-6 md:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/app/profile"><ChevronLeft className="h-4 w-4" /> Profil</Link>
      </Button>

      <section className="mt-4 rounded-xl border border-border bg-card p-8">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Notifikasi</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Pilih dorongan belajar yang ingin Anda terima. Fokusnya sederhana: jaga streak, selesaikan quiz, dan tetap waspada.
        </p>
      </section>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {reminders.map((item) => (
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
