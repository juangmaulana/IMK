"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X, Coins, Check, Lock, Trophy, Award, Medal, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";
import { addPoints, apiRequest, FINLIT_POINTS_EVENT, getPathProgress, getTotalPoints, setPathProgress as savePathProgress, syncUserToLocalStorage, type ApiUser } from "@/lib/api";

type SearchParams = Record<string, string | string[] | undefined>;
type QuizQuestion = {
  id?: string;
  question: string;
  options?: string[];
  answer?: string;
  explanation?: string;
};
type QuizData = {
  questions?: QuizQuestion[];
};
type LearningPathData = {
  modules?: unknown[];
  preQuiz?: QuizData;
  finalQuiz?: QuizData;
};

const PATHS: Record<string, LearningPathData> = {
  pinjol: pinjolPathData,
  penipuan: penipuanPathData,
};

const normalize = (value: string) => value.replace(/^[A-D]\.[\s]*/, "").trim();

const resolveCorrectIndex = (question: QuizQuestion) => {
  const answer = normalize(String(question.answer ?? ""));
  if (/^[A-D]$/.test(answer)) {
    return answer.charCodeAt(0) - 65;
  }

  const options = Array.isArray(question.options) ? question.options : [];
  const directMatch = options.findIndex((option: string) => normalize(option) === answer);
  if (directMatch >= 0) return directMatch;

  return -1;
};

const mapQuestions = (quizData: QuizData | undefined, tag: string) =>
  (quizData?.questions || []).map((question) => ({
    tag,
    prompt: question.question,
    options: (question.options || []).map((option: string) => normalize(option)),
    correct: resolveCorrectIndex(question),
    explanation: question.explanation,
  }));

const getParam = (value: string | string[] | undefined, fallback: string) => {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
};

export default function QuizClient({ searchParams }: { searchParams: SearchParams }) {
  const isFinal = getParam(searchParams.type, "") === "final";
  const pathId = getParam(searchParams.pathId, "pinjol");
  const pathData = PATHS[pathId] || pinjolPathData;
  const finalUnlockStep = (pathData.modules?.length || 0) + 1;
  const finalCompleteStep = (pathData.modules?.length || 0) + 2;

  const questions = useMemo(() => {
    const quizData = isFinal ? pathData.finalQuiz ?? pathData.preQuiz : pathData.preQuiz;
    return mapQuestions(quizData, isFinal ? "Quiz Akhir" : "Pre-Quiz Diagnostik");
  }, [isFinal, pathData]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [pathProgress, setPathProgress] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const readPoints = () => setPoints(getTotalPoints());
    const timer = window.setTimeout(readPoints, 0);

    window.addEventListener(FINLIT_POINTS_EVENT, readPoints);
    window.addEventListener("storage", readPoints);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(FINLIT_POINTS_EVENT, readPoints);
      window.removeEventListener("storage", readPoints);
    };
  }, []);

  useEffect(() => {
    if (!isFinal) return;

    const timer = window.setTimeout(() => {
      setPathProgress(getPathProgress(pathId));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isFinal, pathId]);

  const total = questions.length || 1;
  const current = questions[idx];

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-8">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold">Quiz belum tersedia</h1>
          <p className="mt-2 text-sm text-muted-foreground">Tidak ada pertanyaan untuk jalur yang dipilih.</p>
          <Button asChild className="mt-6">
            <Link href={`/app/paths/${pathId}`}>Kembali ke Learning Path</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isFinal && pathProgress === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-8">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold">Memeriksa progress...</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sebentar, kami sedang memastikan quiz akhir sudah terbuka.</p>
        </div>
      </div>
    );
  }

  if (isFinal && Number(pathProgress || 0) < finalUnlockStep) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-8">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold">Quiz akhir terkunci</h1>
          <p className="mt-2 text-sm text-muted-foreground">Selesaikan semua modul di learning path ini terlebih dahulu.</p>
          <Button asChild className="mt-6">
            <Link href={`/app/paths/${pathId}`}>Kembali ke Learning Path</Link>
          </Button>
        </div>
      </div>
    );
  }

  const submitted = picked !== null;
  const isCorrect = picked === current.correct;

  const submitQuizResult = async (nextAnswers: number[]) => {
    try {
      const payload = await apiRequest<{ user: ApiUser | null }>("/quiz/submit", {
        method: "POST",
        body: JSON.stringify({
          pathId,
          type: isFinal ? "final" : "pre",
          answers: nextAnswers,
        }),
      });
      if (payload.user) {
        syncUserToLocalStorage(payload.user);
      }
    } catch {
      // Jika API belum tersedia, user tetap bisa lanjut dengan cache lokal.
    }
  };

  const next = () => {
    if (picked === null) return;

    const nextScore = score + (isCorrect ? 1 : 0);
    const nextAnswers = [...answers];
    nextAnswers[idx] = picked;
    setAnswers(nextAnswers);

    if (isCorrect) {
      addPoints(isFinal ? 20 : 10);
    }

    if (idx + 1 === total) {
      if (isFinal) {
        setFinalScore(nextScore);
        setShowResult(true);
        void submitQuizResult(nextAnswers);
        return;
      }

      savePathProgress(pathId, 1);
      void submitQuizResult(nextAnswers);
      window.location.assign(`/app/paths/${pathId}?progress=1&updated=${Date.now()}`);
      return;
    }

    setScore(nextScore);
    setPicked(null);
    setIdx((value) => value + 1);
  };

  const finishQuiz = () => {
    const totalScore = finalScore;
    const finalPercentage = (totalScore / total) * 100;
    if (finalPercentage >= 70) {
      savePathProgress(pathId, finalCompleteStep);
    }
    window.location.assign(`/app/paths/${pathId}?progress=${getPathProgress(pathId)}&updated=${Date.now()}`);
  };

  if (showResult) {
    const percentage = Math.round((finalScore / total) * 100);
    let badge = null;
    let title = "";
    let reward = "";
    let passed = false;

    const pathPrefix = pathId === "pinjol" ? "Anti-Pinjol" : "Anti-Scam";
    const certName = pathId === "pinjol" ? "Anti-Pinjol Ilegal" : "Penipuan Digital";

    if (percentage >= 90) {
      badge = <Trophy className="mx-auto h-20 w-20 text-yellow-500 drop-shadow-md" />;
      title = `${pathPrefix} Expert`;
      reward = `Badge Gold + Sertifikat ${certName}`;
      passed = true;
    } else if (percentage >= 80) {
      badge = <Award className="mx-auto h-20 w-20 text-slate-300 drop-shadow-md" />;
      title = `${pathPrefix} Champion`;
      reward = "Badge Silver + Poin Bonus 300";
      passed = true;
    } else if (percentage >= 70) {
      badge = <Medal className="mx-auto h-20 w-20 text-amber-700 drop-shadow-md" />;
      title = `${pathPrefix} Aware`;
      reward = pathId === "pinjol" ? "Badge Bronze + Unlock Penipuan Digital" : `Badge Bronze + Sertifikat ${certName}`;
      passed = true;
    } else {
      badge = <RefreshCcw className="mx-auto h-20 w-20 text-muted-foreground drop-shadow-md" />;
      title = "Perlu Belajar Lagi";
      reward = "Ulangi modul yang belum dipahami";
      passed = false;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-8 text-center">
        <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-xl">
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Hasil Quiz Akhir</div>
          <div className="py-6">{badge}</div>
          <h2 className="text-3xl font-bold">{percentage}%</h2>
          <div className="text-xl font-bold text-primary">{title}</div>
          <div className="mx-auto max-w-xs text-sm text-muted-foreground">
            {passed ? "Luar biasa! Kamu berhasil lulus dan mendapatkan:" : "Skor kamu di bawah 70%. Jangan menyerah, pelajari lagi modulnya!"}
          </div>
          <div className="rounded-xl border bg-secondary/50 p-4 font-medium">🎁 {reward}</div>
          <Button className="w-full" size="lg" onClick={finishQuiz}>
            {passed ? "Ambil Reward & Selesai" : "Kembali ke Learning Path"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4">
          <Link href={`/app/paths/${pathId}`} className="rounded-md p-2 hover:bg-secondary">
            <X className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <div className="h-1 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((idx + 1) / total) * 100}%` }} />
            </div>
            <div className="mt-1 text-center text-xs uppercase tracking-widest text-muted-foreground">Question {idx + 1} of {total}</div>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold">
            <Coins className="h-4 w-4 text-primary" /> {points.toLocaleString("id-ID")}
          </div>
        </div>

        <div className="mt-10 text-center text-xs uppercase tracking-widest text-muted-foreground">◇ {current.tag}</div>
        <h1 className="mt-3 text-center text-2xl font-bold leading-tight sm:text-3xl">{current.prompt}</h1>

        <div className="mt-8 space-y-3">
          {current.options.map((option: string, optionIndex: number) => {
            const letter = String.fromCharCode(65 + optionIndex);
            const isPicked = picked === optionIndex;
            const isAnswer = current.correct === optionIndex;
            let cls = "border-border bg-card hover:border-primary/50";
            if (submitted && isAnswer) cls = "border-success bg-success/10";
            else if (submitted && isPicked && !isAnswer) cls = "border-primary bg-primary/10";

            return (
              <button
                key={optionIndex}
                onClick={() => !submitted && setPicked(optionIndex)}
                className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left text-base leading-relaxed transition ${cls}`}
              >
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded text-xs font-bold ${
                    submitted && isAnswer
                      ? "bg-success text-success-foreground"
                      : submitted && isPicked
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {letter}
                </span>
                <span className="pt-1">{option}</span>
                {submitted && isAnswer && <Check className="ml-auto h-5 w-5 text-success" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`mt-8 flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row ${isCorrect ? "border-primary/40 bg-primary/10" : "border-destructive/40 bg-destructive/10"}`}>
            <div className="flex items-start gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${isCorrect ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
                {isCorrect ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-base font-bold">{isCorrect ? "FINLIT Insight!" : "Incorrect Answer"}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{current.explanation}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isCorrect && (
                <span className="flex items-center gap-1 rounded-md bg-background/40 px-3 py-1.5 text-xs font-medium">
                  +{isFinal ? 20 : 10} <Coins className="h-3 w-3 text-primary" />
                </span>
              )}
              <Button size="sm" onClick={next}>Continue →</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
