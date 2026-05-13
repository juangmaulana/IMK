"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Settings, User, Play, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Module = { label: string; locked?: boolean };

export function LearningPath({
  title,
  modules,
  pathId = "pinjol",
}: {
  title: string;
  modules: Module[];
  pathId?: string;
}) {
  const progressKey = `${pathId}Progress`;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(Number(localStorage.getItem(progressKey) || 0));
  }, [progressKey]);

  const progressPercent = Math.min(100, Math.max(5, (progress / 6) * 100));

  const completeModule = (moduleIndex: number) => {
    const newProgress = moduleIndex + 1;
    if (newProgress > progress) {
      setProgress(newProgress);
      localStorage.setItem(progressKey, newProgress.toString());
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <div className="text-xs font-medium text-muted-foreground">{title}</div>
          <div className="mx-auto mt-2 h-1 w-64 rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">{Math.round(progressPercent)}%</div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md p-2 hover:bg-secondary"><Bell className="h-4 w-4" /></button>
          <button className="rounded-md p-2 hover:bg-secondary"><Settings className="h-4 w-4" /></button>
          <button className="rounded-md p-2 hover:bg-secondary"><User className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold">Your Journey to Financial Security</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Navigate the risks of predatory lending and secure your financial sanctuary.
          Complete each module to unlock the final badge.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-3xl space-y-8">
        <PathDecoration />
        <div className={`relative z-10 ml-auto w-72 rounded-xl border p-5 ${progress > 0 ? "border-success bg-success/10" : "border-primary/40 bg-card shadow-glow"}`}>
          <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${progress > 0 ? "text-success" : "text-primary"}`}>
            {progress > 0 ? <Check className="h-3 w-3" /> : <Play className="h-3 w-3" fill="currentColor" />}
            {progress > 0 ? "Selesai" : "Mulai Di Sini"}
          </div>
          <div className="mt-2 font-bold">Pre-Quiz Diagnostik</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Uji pengetahuan mengenai topik ini sebelum memulai pembelajaran.
          </p>
          <Button asChild size="sm" className="mt-4 w-full" variant={progress > 0 ? "outline" : "default"}>
            <Link href={`/quiz?pathId=${pathId}&type=pre`}>{progress > 0 ? "Ulangi Pre-Quiz" : "Mulai Pre-Quiz →"}</Link>
          </Button>
        </div>

        {modules.map((m, i) => {
          const moduleIndex = i + 1;
          const isUnlocked = progress >= moduleIndex;
          const isCompleted = progress > moduleIndex;
          return (
            <ModuleCard 
              key={i} 
              index={i} 
              label={m.label} 
              side={i % 2 === 0 ? "left" : "right"} 
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              onComplete={() => completeModule(moduleIndex)}
              pathId={pathId}
            />
          );
        })}

        <div className={`relative z-10 mx-auto w-44 rounded-xl border p-5 text-center ${progress >= 5 ? "border-primary/40 bg-card shadow-glow" : "border-border bg-card opacity-70"}`}>
          <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
            {progress >= 5 ? <Play className="h-4 w-4 text-primary" fill="currentColor" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
          </div>
          <div className="mt-3 font-bold">Quiz Akhir & Badge</div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {progress >= 5 ? "Terbuka! Uji pemahamanmu." : "Selesaikan semua modul untuk membuka."}
          </div>
          {progress >= 5 && (
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href={`/quiz?pathId=${pathId}&type=final`}>
                {progress === 6 ? "Ulangi Quiz" : "Mulai Quiz"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function PathDecoration() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M 75 8 C 50 18, 40 28, 35 40 C 30 50, 55 55, 75 62 C 90 68, 50 75, 30 82 C 20 86, 50 92, 50 100"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="1.2 1.2"
        strokeLinecap="round"
        className="text-muted-foreground/50"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ModuleCard({ 
  index, 
  label, 
  side,
  isUnlocked,
  isCompleted,
  onComplete,
  pathId
}: { 
  index: number; 
  label: string; 
  side: "left" | "right";
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  pathId: string;
}) {
  return (
    <div className={`relative z-10 flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`w-72 rounded-xl border p-5 transition-all ${
        isCompleted ? "border-success bg-success/10" : 
        isUnlocked ? "border-primary/40 bg-card shadow-glow" : 
        "border-border bg-card opacity-70"
      }`}>
        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${
          isCompleted ? "text-success" : 
          isUnlocked ? "text-primary" : 
          "text-muted-foreground"
        }`}>
          {isCompleted ? <Check className="h-3 w-3" /> : 
           isUnlocked ? <Play className="h-3 w-3" fill="currentColor" /> : 
           <Lock className="h-3 w-3" />}
          {isCompleted ? "Selesai" : isUnlocked ? "Terbuka" : "Terkunci"}
        </div>
        <div className="mt-2 font-bold">Modul {index + 1}: {label}</div>
        {isUnlocked && (
          <Button asChild size="sm" variant={isCompleted ? "outline" : "default"} className="mt-4 w-full">
            <Link href={`/module?pathId=${pathId}&id=${index + 1}`}>
              {isCompleted ? "Baca Ulang Modul" : "Baca Modul"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
