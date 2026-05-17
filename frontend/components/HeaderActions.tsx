"use client";

import Link from "next/link";
import { Bell, Settings, User } from "lucide-react";

type HeaderActionsProps = {
  variant?: "full" | "settings";
};

const actions = [
  { href: "/app/profile/notifications", label: "Notifikasi", icon: Bell },
  { href: "/app/profile/privacy", label: "Pengaturan", icon: Settings },
  { href: "/app/profile", label: "Profil", icon: User },
];

export function HeaderActions({ variant = "full" }: HeaderActionsProps) {
  const visibleActions = variant === "settings" ? actions.slice(1, 2) : actions;

  return (
    <div className="flex items-center gap-2">
      {visibleActions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          aria-label={action.label}
          title={action.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <action.icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}
