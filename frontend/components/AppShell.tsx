"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Trophy, User, Store, Flame, Coins, LogOut } from "lucide-react";

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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStreak(Number(localStorage.getItem("dailyStreak") || 0));
      setPoints(Number(localStorage.getItem("totalPoints") || 0));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <aside className="flex w-full flex-col border-r border-sidebar-border bg-sidebar md:min-h-screen md:w-64">
        <div className="px-6 py-6">
          <Logo subtitle short />
        </div>
        <nav className="flex-1 px-3">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to === "/app/paths" && pathname.startsWith("/app/paths"));
            return (
              <div key={n.to}>
                <Link
                  href={n.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
                {n.to === "/app/paths" && active && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                    {subPaths.map((s) => (
                      <Link
                        key={s.to}
                        href={s.to}
                        className={`block rounded px-2 py-1 text-xs ${
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
        <div className="m-3 rounded-lg bg-sidebar-accent/60 p-3 text-sm font-bold flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 text-xs text-sidebar-foreground/70">
              <Flame className={`h-5 w-5 flex-none ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} fill={streak > 0 ? "currentColor" : "none"} />
              <span>Daily Streak:</span>
            </div>
            <span className={`flex-none ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`}>{streak}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 text-xs text-sidebar-foreground/70">
              <Coins className="h-5 w-5 flex-none text-yellow-500" fill="currentColor" />
              <span>Total Points:</span>
            </div>
            <span className="flex-none text-yellow-500">{points.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <div className="border-t border-sidebar-border p-3">
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
