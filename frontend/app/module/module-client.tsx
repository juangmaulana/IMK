"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";

type SearchParams = Record<string, string | string[] | undefined>;
type MiniQuizQuestion = {
  id?: string;
  question: string;
  options?: string[];
  answer?: string;
  explanation?: string;
};
type ModuleData = {
  title: string;
  duration?: string;
  objectives?: string[];
  content?: string;
  miniQuiz?: MiniQuizQuestion[];
};
type LearningPathData = {
  modules: ModuleData[];
};

const PATHS: Record<string, LearningPathData> = {
  pinjol: pinjolPathData,
  penipuan: penipuanPathData,
};

const getParam = (value: string | string[] | undefined, fallback: string) => {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
};

const normalizeAnswer = (value: string) => value.replace(/^[A-D]\.[\s]*/, "").trim();

const resolveCorrectIndex = (question: MiniQuizQuestion) => {
  const answer = normalizeAnswer(String(question.answer ?? ""));
  if (/^[A-D]$/.test(answer)) {
    return answer.charCodeAt(0) - 65;
  }

  const options = Array.isArray(question.options) ? question.options : [];
  const match = options.findIndex((option) => normalizeAnswer(option) === answer);
  return match >= 0 ? match : 0;
};

export default function ModuleClient({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const moduleId = Number(getParam(searchParams.id, "1"));
  const pathId = getParam(searchParams.pathId, "pinjol");
  const pathData = PATHS[pathId] || pinjolPathData;
  const moduleData = pathData.modules[moduleId - 1];
  const progressKey = `${pathId}Progress`;
  const [accessProgress, setAccessProgress] = useState<number | null>(null);
  const [miniQuizAnswers, setMiniQuizAnswers] = useState<Record<number, number>>({});
  const [miniQuizSubmitted, setMiniQuizSubmitted] = useState(false);
  const miniQuizRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => {
      setAccessProgress(Number(localStorage.getItem(progressKey) || 0));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [moduleId, pathId, progressKey]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMiniQuizAnswers({});
      setMiniQuizSubmitted(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [moduleId, pathId]);

  const quizItems = useMemo<MiniQuizQuestion[]>(
    () => (Array.isArray(moduleData?.miniQuiz) ? moduleData.miniQuiz : []),
    [moduleData]
  );
  const hasMiniQuiz = quizItems.length > 0;
  const allMiniQuizAnswered = quizItems.every((_, index) => miniQuizAnswers[index] !== undefined);
  const miniQuizScore = miniQuizSubmitted
    ? quizItems.filter((question, index) => miniQuizAnswers[index] === resolveCorrectIndex(question)).length
    : 0;
  const moduleAlreadyCompleted = accessProgress !== null && accessProgress > moduleId;
  const canFinishModule = moduleAlreadyCompleted || !hasMiniQuiz || miniQuizSubmitted;

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

  if (accessProgress === null) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">Memeriksa progress...</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sebentar, kami sedang memastikan modul ini sudah terbuka.</p>
        </div>
      </div>
    );
  }

  if (accessProgress < moduleId) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">Modul terkunci</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {moduleId === 1
              ? "Selesaikan pre-quiz terlebih dahulu untuk membuka Modul 1."
              : `Selesaikan Modul ${moduleId - 1} terlebih dahulu untuk membuka Modul ${moduleId}.`}
          </p>
          <Button asChild className="mt-6">
            <Link href={`/app/paths/${pathId}`}>Kembali ke Learning Path</Link>
          </Button>
        </div>
      </div>
    );
  }

  const finishModule = () => {
    if (!canFinishModule) return;

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
            {hasMiniQuiz && (
              <Button className="mt-6" onClick={() => miniQuizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                Lanjut ke Mini Quiz
              </Button>
            )}
          </section>
        )}

        {quizItems.length > 0 && (
          <section ref={miniQuizRef} className="scroll-mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold text-primary">Mini Quiz</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Jawab semua pertanyaan mini quiz untuk menyelesaikan modul ini dan membuka langkah berikutnya.
            </p>
            <div className="mt-4 space-y-4">
              {quizItems.map((question, index) => {
                const selected = miniQuizAnswers[index];
                const correct = resolveCorrectIndex(question);
                return (
                  <div key={question.id ?? index} className="rounded-xl border border-border bg-background/40 p-4">
                    <p className="font-medium text-foreground">{question.question}</p>
                    <div className="mt-3 space-y-2">
                      {(question.options || []).map((option: string, optionIndex: number) => {
                        const picked = selected === optionIndex;
                        const isCorrect = correct === optionIndex;
                        let stateClass = "border-border bg-card hover:border-primary/50";

                        if (miniQuizSubmitted && isCorrect) stateClass = "border-success bg-success/10";
                        else if (miniQuizSubmitted && picked && !isCorrect) stateClass = "border-destructive bg-destructive/10";
                        else if (picked) stateClass = "border-primary bg-primary/10";

                        return (
                          <button
                            key={optionIndex}
                            type="button"
                            disabled={miniQuizSubmitted}
                            onClick={() => setMiniQuizAnswers((answers) => ({ ...answers, [index]: optionIndex }))}
                            className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition disabled:cursor-default ${stateClass}`}
                          >
                            <span className="flex h-6 w-6 flex-none items-center justify-center rounded bg-secondary text-xs font-bold text-muted-foreground">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span>{normalizeAnswer(option)}</span>
                          </button>
                        );
                      })}
                    </div>
                    {miniQuizSubmitted && question.explanation && (
                      <p className="mt-3 text-xs text-muted-foreground">Jawaban: {question.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-border bg-background/40 p-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold">
                  {miniQuizSubmitted
                    ? `Mini quiz selesai: ${miniQuizScore}/${quizItems.length} benar`
                    : moduleAlreadyCompleted
                      ? "Modul ini sudah selesai"
                      : "Selesaikan mini quiz terlebih dahulu"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {miniQuizSubmitted
                    ? "Sekarang kamu bisa menandai modul ini selesai."
                    : moduleAlreadyCompleted
                      ? "Kamu tetap bisa mengulang mini quiz untuk latihan."
                      : "Pilih satu jawaban untuk setiap pertanyaan, lalu submit mini quiz."}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                disabled={!allMiniQuizAnswered || miniQuizSubmitted}
                onClick={() => setMiniQuizSubmitted(true)}
              >
                {miniQuizSubmitted ? "Mini Quiz Selesai" : "Submit Mini Quiz"}
              </Button>
            </div>
          </section>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="sm:flex-1">
            <Link href={`/app/paths/${pathId}`}>Kembali ke Learning Path</Link>
          </Button>
          <Button className="sm:flex-1" onClick={finishModule} disabled={!canFinishModule}>
            {canFinishModule ? "Tandai Selesai" : "Selesaikan Mini Quiz Dulu"}
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
