"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Shield, Lock, Rocket, Flame, Coins, Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeaderActions } from "@/components/HeaderActions";
import { apiRequest, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

const cards = [
  { icon: Bell, name: "Notifikasi", desc: "Atur pengingat belajar, streak, quiz, dan kabar keamanan finansial.", cta: "Periksa", href: "/app/profile/notifications" },
  { icon: Shield, name: "Koleksi Lencana", desc: "Lihat badge, sertifikat, dan progres pencapaian FINLIT Anda.", cta: "Pergi", href: "/app/profile/badges" },
  { icon: Lock, name: "Privasi Akun", desc: "Kelola visibilitas profil, leaderboard, dan keamanan akun.", cta: "Periksa", href: "/app/profile/privacy" },
  { icon: Rocket, name: "Inventaris Peningkatan", desc: "Gunakan boost untuk menjaga streak dan mempercepat FinPoin.", cta: "Periksa", href: "/app/profile/inventory" },
];

export default function ProfilePage() {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [displayName, setDisplayName] = useState("Nama Pengguna");
  const [draftName, setDraftName] = useState("Nama Pengguna");
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStreak(Number(localStorage.getItem("dailyStreak") || 0));
      setPoints(Number(localStorage.getItem("totalPoints") || 0));
      const savedName = localStorage.getItem("profileName") || "Nama Pengguna";
      setDisplayName(savedName);
      setDraftName(savedName);
    }, 0);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        const syncedUser = syncUserToLocalStorage(user);
        setStreak(syncedUser.dailyStreak);
        setPoints(syncedUser.points);
        setDisplayName(user.name);
        setDraftName(user.name);
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika API belum tersedia.
      });

    return () => window.clearTimeout(timer);
  }, []);

  const saveName = async () => {
    const nextName = draftName.trim();
    if (!nextName) return;

    localStorage.setItem("profileName", nextName);
    setDisplayName(nextName);
    setDraftName(nextName);
    setEditingName(false);

    try {
      const { user } = await apiRequest<{ user: ApiUser }>("/profile", {
        method: "PATCH",
        body: JSON.stringify({ name: nextName }),
      });
      syncUserToLocalStorage(user);
      setDisplayName(user.name);
      setDraftName(user.name);
    } catch {
      // Nama lokal tetap tersimpan jika API belum tersedia.
    }
  };

  const cancelEditName = () => {
    setDraftName(displayName);
    setEditingName(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-6 text-[#f1eeee] md:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-sm font-bold uppercase tracking-wider text-primary">Profil</h1>
        <HeaderActions variant="settings" />
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#242020] bg-[#161313] p-8 lg:flex-row">
        <div className="w-full max-w-xl">
          {editingName ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                className="h-12 max-w-sm bg-input text-xl font-bold"
                maxLength={40}
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="icon" onClick={saveName} disabled={!draftName.trim()} aria-label="Simpan nama">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={cancelEditName} aria-label="Batalkan edit nama">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-4xl font-bold text-gradient-accent">{displayName}</h2>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setEditingName(true)}
                aria-label="Edit nama profil"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
          <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">Bekali diri Anda dengan alat untuk melindungi progres dan mempercepat literasi finansial Anda.</p>
        </div>
        <div className="rounded-lg border border-[#2d2725] bg-[#201b1a] p-4 text-xl font-bold flex gap-6">
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

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div key={c.name} className="rounded-xl border border-[#242020] bg-[#161313] p-5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#201b1a]">
              <c.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-4 font-bold">{c.name}</div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            <Button asChild variant="secondary" size="sm" className="mt-5">
              <Link href={c.href}>{c.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
