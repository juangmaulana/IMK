"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";

const PATHS: Record<string, any> = {
  pinjol: pinjolPathData,
  penipuan: penipuanPathData,
};

export default function ModulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleId = Number(searchParams.get("id") || "1");
  const pathId = searchParams.get("pathId") || "pinjol";
  const pathData = PATHS[pathId] || pinjolPathData;
  const moduleData = pathData.modules[moduleId - 1];
  const progressKey = `${pathId}Progress`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId, pathId]);

  const quizItems = useMemo(() => (Array.isArray(moduleData?.miniQuiz) ? moduleData.miniQuiz : []), [moduleData]);

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">Module not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">Konten modul tidak tersedia untuk parameter yang dipilih.</p>
          <Button asChild className="mt-6">
            <Link href={`/app/paths/${pathId}`}>Kembali ke learning path</Link>
          </Button>
        </div>
      </div>
    );
  }

  const finishModule = () => {
    const currentProgress = Number(localStorage.getItem(progressKey) || 0);
    const newProgress = moduleId + 1;
    if (newProgress > currentProgress) {
      localStorage.setItem(progressKey, newProgress.toString());
    }
    router.push(`/app/paths/${pathId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground">
      <div className="bg-[#1f4e79] px-6 py-8 text-center text-white">
        <Link href={`/app/paths/${pathId}`} className="absolute left-4 top-6 flex items-center text-white/80 hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <div className="text-sm font-bold uppercase tracking-widest text-white/80">MODUL {moduleId}</div>
        <h1 className="mt-2 text-2xl font-bold leading-tight">{moduleData.title}</h1>
        <div className="mt-2 text-sm italic text-white/80">Durasi: {moduleData.duration}</div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-xl font-bold text-primary">Tujuan Pembelajaran</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {(Array.isArray(moduleData.objectives) ? moduleData.objectives : []).map((objective: string, index: number) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        {moduleData.content && (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">Materi</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              <ReactMarkdown>{moduleData.content}</ReactMarkdown>
            </div>
          </section>
        )}

        {quizItems.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">Mini Quiz</h2>
            <div className="mt-4 space-y-4">
              {quizItems.map((question: any, index: number) => (
                <div key={question.id ?? index} className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-medium text-foreground">{question.question}</p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {(question.options || []).map((option: string, optionIndex: number) => (
                      <li key={optionIndex} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                  {question.explanation && <p className="mt-3 text-xs text-muted-foreground">Jawaban: {question.explanation}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="sm:flex-1">
            <Link href={`/app/paths/${pathId}`}>Kembali ke Learning Path</Link>
          </Button>
          <Button className="sm:flex-1" onClick={finishModule}>
            Tandai Selesai
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" /> Status Progress
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Selesaikan modul ini untuk membuka langkah berikutnya di learning path.</p>
        </div>
      </div>
    </div>
  );
}
