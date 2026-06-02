"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "./SiteHeader";
import { AlertTriangle, Fingerprint } from "lucide-react";

const stats = [
  { v: "2", l: "Topik Utama" },
  { v: "8", l: "Total Modul" },
  { v: "16+", l: "Badge" },
  { v: "100%", l: "Gratis" },
];

const modules = [
  {
    icon: AlertTriangle,
    title: "Anti Pinjol Ilegal",
    desc: "Kenali ciri-ciri pinjaman online ilegal, cara kerja debt collector agresif, dan langkah mitigasi jika terjebak.",
    to: "/app/paths/pinjol",
  },
  {
    icon: Fingerprint,
    title: "Penipuan Digital",
    desc: "Pelajari taktik phishing, social engineering, dan investasi bodong. Tingkatkan literasi keamanan siber Anda.",
    to: "/app/paths/penipuan",
  },
];

const steps = [
  ["Pilih Materi", "Pilih topik yang relevan dengan risiko finansial saat ini."],
  ["Pelajari Kasus", "Baca studi kasus nyata dan skenario penipuan."],
  ["Jawab Kuis", "Uji pemahaman Anda dengan simulasi keputusan finansial."],
  ["Raih Badge", "Dapatkan pengakuan atas ketangguhan finansial Anda."],
];

export function Landing({ signedIn = false }: { signedIn?: boolean }) {
  const handleStartLearning = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!signedIn) return;

    event.preventDefault();
    document.getElementById("learning-modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader signedIn={signedIn} />

      {/* Hero */}
      <section className="bg-hero">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Lindungi Diri dari{" "}
            <span className="text-gradient-accent">Pinjol & Penipuan Digital</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pelajari cara mengenali bahaya finansial melalui simulasi interaktif.
            Kumpulkan badge dan buktikan ketangguhan finansial Anda di Sanctuary of
            Financial Literacy.
          </p>
          <Button asChild size="lg" className="mt-8 shadow-glow">
            <Link href={signedIn ? "#learning-modules" : "/signup"} onClick={handleStartLearning}>Mulai Belajar</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-10 max-w-6xl px-6">
        <div className="grid grid-cols-2 divide-border rounded-xl border border-border bg-card p-6 shadow-card sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-bold text-accent">{s.v}</div>
              <div className="mt-1 text-sm uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="learning-modules" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <h2 className="text-3xl font-bold">Pilih Modul Pembelajaran</h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Pahami taktik yang digunakan oleh predator finansial dan pelajari cara
          membentengi diri dari risiko utang berbahaya.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {modules.map((m) => (
            <div key={m.title} className="rounded-xl border border-border bg-card p-6 shadow-card transition hover:border-primary/60">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{m.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{m.desc}</p>
              <Button asChild variant="secondary" size="sm" className="mt-6">
                <Link href={signedIn ? m.to : "/login"}>Mulai Modul →</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-card/40 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold">Cara Bermain & Belajar</h2>
          <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tingkatkan skor literasi finansial Anda melalui alur pembelajaran yang dirancang khusus.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-4">
            {steps.map(([t, d], i) => (
              <div key={t} className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-secondary font-display text-xl font-bold text-primary">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[60%] right-0 top-6 hidden h-px border-t border-dashed border-border sm:block" style={{ width: "80%" }} />
                )}
                <div className="mt-4 font-bold">{t}</div>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Siap Melindungi Diri?</h2>
        <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
          Bergabunglah dengan Sanctuary of Financial Literacy hari ini. Gratis selamanya.
        </p>
        <Button asChild size="lg" className="mt-8 shadow-glow">
          <Link href="/signup">Daftar Sekarang — Gratis</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 sm:flex-row sm:items-center text-[10px] text-muted-foreground">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-16">
            <div className="font-display font-bold text-primary uppercase leading-tight text-center sm:text-left">
              <div>FINLIT</div>
              <div>Ledger</div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 uppercase tracking-[0.2em] opacity-60 sm:gap-10">
              <span className="cursor-pointer hover:opacity-100 transition-opacity">Regulatory Disclosure</span>
              <span className="cursor-pointer hover:opacity-100 transition-opacity">Privacy Policy</span>
              <span className="cursor-pointer hover:opacity-100 transition-opacity">Terms of Service</span>
            </div>
          </div>
          <div className="max-w-[280px] text-center uppercase leading-relaxed tracking-[0.15em] opacity-60 sm:text-right">
            © 2026 FINANCIAL LITERACY LEDGER. AUTHORIZED SANCTUARY FOR FINANCIAL LITERACY.
          </div>
        </div>
      </footer>
    </div>
  );
}
