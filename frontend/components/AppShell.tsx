"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Home, BookOpen, Trophy, User, Store, Flame, Coins, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Shield, X } from "lucide-react";
import { apiRequest, clearAuthSession, FINLIT_POINTS_EVENT, getTotalPoints, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

const nav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/app/paths", label: "Learning Paths", icon: BookOpen },
  { to: "/app/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/store", label: "Store", icon: Store },
];

const subPaths = [
  { to: "/app/paths/pinjol", label: "1. Anti-Pinjol Ilegal" },
  { to: "/app/paths/penipuan", label: "2. Penipuan Digital" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const readStats = () => {
      setStreak(Number(localStorage.getItem("dailyStreak") || 0));
      setPoints(getTotalPoints());
    };
    const timer = window.setTimeout(readStats, 0);

    window.addEventListener(FINLIT_POINTS_EVENT, readStats);
    window.addEventListener("storage", readStats);

    apiRequest<{ user: ApiUser }>("/auth/me")
      .then(({ user }) => {
        const syncedUser = syncUserToLocalStorage(user);
        setStreak(syncedUser.dailyStreak);
        setPoints(syncedUser.points);
      })
      .catch(() => {
        // Tetap gunakan cache lokal jika backend belum tersedia.
      });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(FINLIT_POINTS_EVENT, readStats);
      window.removeEventListener("storage", readStats);
    };
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] md:h-screen md:flex-row md:overflow-hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-sidebar-border bg-sidebar px-4 py-3 md:hidden">
        <Logo short />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Buka sidebar"
          aria-controls="app-sidebar"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar transition-[transform,width] duration-200 md:relative md:z-auto md:h-full md:flex-shrink-0 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarOpen ? "md:w-64" : "md:w-20"}`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-5">
          <div className={sidebarOpen ? "" : "md:hidden"}>
            <Logo subtitle short />
          </div>
          {!sidebarOpen && <Shield className="hidden h-6 w-6 flex-none text-primary md:block" fill="currentColor" fillOpacity={0.15} />}
          <Button type="button" size="icon" variant="ghost" className="md:hidden" aria-label="Tutup sidebar" onClick={() => setMobileSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="hidden md:inline-flex"
            aria-label={sidebarOpen ? "Perkecil sidebar" : "Buka sidebar"}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 px-3">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to === "/app/paths" && pathname.startsWith("/app/paths"));
            return (
              <div key={n.to}>
                <Link
                  href={n.to}
                  title={!sidebarOpen ? n.label : undefined}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base transition ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                  }`}
                >
                  <n.icon className="h-5 w-5 flex-none" />
                  <span className={sidebarOpen ? "" : "md:hidden"}>{n.label}</span>
                </Link>
                {n.to === "/app/paths" && active && (sidebarOpen || mobileSidebarOpen) && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                    {subPaths.map((s) => (
                      <Link
                        key={s.to}
                        href={s.to}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`block rounded px-2 py-1.5 text-sm ${
                          pathname === s.to ? "text-primary font-bold" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                        }`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className={`m-3 flex flex-col gap-3 rounded-lg bg-sidebar-accent/60 p-3 text-sm font-bold ${sidebarOpen ? "" : "md:items-center md:px-2"}`}>
          <div className={`flex items-center gap-2 ${sidebarOpen ? "justify-between" : "md:justify-center"}`} title={`Daily Streak: ${streak}`}>
            <div className="flex min-w-0 items-center gap-2 text-sm text-sidebar-foreground/70">
              <Flame className={`h-5 w-5 flex-none ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} fill={streak > 0 ? "currentColor" : "none"} />
              <span className={sidebarOpen ? "" : "md:hidden"}>Daily Streak:</span>
            </div>
            <span className={`flex-none ${sidebarOpen ? "" : "md:hidden"} ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`}>{streak}</span>
          </div>
          <div className={`flex items-center gap-2 ${sidebarOpen ? "justify-between" : "md:justify-center"}`} title={`Total Points: ${points.toLocaleString("id-ID")}`}>
            <div className="flex min-w-0 items-center gap-2 text-sm text-sidebar-foreground/70">
              <Coins className="h-5 w-5 flex-none text-yellow-500" fill="currentColor" />
              <span className={sidebarOpen ? "" : "md:hidden"}>Total Points:</span>
            </div>
            <span className={`flex-none text-yellow-500 ${sidebarOpen ? "" : "md:hidden"}`}>{points.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <div className="border-t border-sidebar-border p-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                title={!sidebarOpen ? "Log out" : undefined}
                className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <LogOut className="h-5 w-5 flex-none" />
                <span className={sidebarOpen ? "" : "md:hidden"}>Log out</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Keluar dari FINLIT?</AlertDialogTitle>
                <AlertDialogDescription>
                  Pastikan progres belajar Anda sudah tersimpan. Anda perlu masuk kembali untuk melanjutkan sesi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Ya, keluar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>
      <main className="min-h-screen flex-1 overflow-x-hidden bg-[#0f0f0f] md:min-h-0 md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
