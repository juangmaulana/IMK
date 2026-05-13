import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { X, Coins, Check, Lock, Trophy, Award, Medal, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

import { pinjolPathData } from "@/data/pinjol-content";
import { penipuanPathData } from "@/data/penipuan-content";

const mapQuestions = (quizData: any, tag: string) => 
  quizData.questions.map((q: any) => {
    const correctIndex = q.answer.charCodeAt(0) - 65;
    const options = q.options.map((opt: string) => opt.replace(/^[A-D]\.\s/, ""));
    return {
      tag,
      q: q.question,
      options: options,
      correct: correctIndex,
      insight: q.explanation,
    };
  });

function QuizPage() {
  const isFinal = new URLSearchParams(window.location.search).get("type") === "final";
  const pathId = new URLSearchParams(window.location.search).get("pathId") || "pinjol";
  const progressKey = `${pathId}Progress`;

  const allData: Record<string, any> = { 
    pinjol: pinjolPathData,
    penipuan: penipuanPathData
  };
  const pathData = allData[pathId] || pinjolPathData;

  const QUESTIONS = isFinal 
    ? mapQuestions(pathData.finalQuiz, "Quiz Akhir")
    : mapQuestions(pathData.preQuiz, "Pre-Quiz Diagnostik");

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const q = QUESTIONS[idx];
  const submitted = picked !== null;
  const isCorrect = picked === q.correct;
  const total = QUESTIONS.length;

  const nav = useNavigate();
  const next = () => {
    if (isCorrect) setScore((s) => s + 1);

    if (idx + 1 === total) {
      if (isFinal) {
        setShowResult(true);
        return;
      }
      const currentProgress = Number(localStorage.getItem(progressKey) || 0);
      if (!isFinal && currentProgress < 1) {
        localStorage.setItem(progressKey, "1");
      }
      nav({ to: `/app/paths/${pathId}` });
      return;
    }
    setPicked(null);
    setIdx((i) => i + 1);
  };

  const finishQuiz = () => {
    const finalPercentage = (score / total) * 100;
    if (finalPercentage >= 70) {
      const currentProgress = Number(localStorage.getItem(progressKey) || 0);
      if (currentProgress < 6) {
        localStorage.setItem(progressKey, "6");
      }
    }
    nav({ to: `/app/paths/${pathId}` });
  };

  if (showResult) {
    const percentage = (score / total) * 100;
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
      reward = "Badge Silver + Poin Bonus 500";
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
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Hasil Quiz Akhir
          </div>
          <div className="py-6">
            {badge}
          </div>
          <h2 className="text-3xl font-bold">{percentage}%</h2>
          <div className="text-xl font-bold text-primary">{title}</div>
          <div className="mx-auto max-w-xs text-sm text-muted-foreground">
            {passed ? "Luar biasa! Kamu berhasil lulus dan mendapatkan:" : "Skor kamu di bawah 70%. Jangan menyerah, pelajari lagi modulnya!"}
          </div>
          <div className="rounded-xl border bg-secondary/50 p-4 font-medium">
            🎁 {reward}
          </div>
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
          <Link to={`/app/paths/${pathId}` as any} className="rounded-md p-2 hover:bg-secondary">
            <X className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <div className="h-1 rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((idx + 1) / total) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              Question {idx + 1} of {total}
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs">
            <Coins className="h-3 w-3 text-primary" /> 340
          </div>
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
          ◇ {q.tag}
        </div>
        <h1 className="mt-3 text-center text-2xl font-bold leading-tight sm:text-3xl">
          {q.q}
        </h1>

        <div className="mt-8 space-y-3">
          {q.options.map((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            const isPicked = picked === i;
            const isAnswer = q.correct === i;
            let cls = "border-border bg-card hover:border-primary/50";
            if (submitted && isAnswer) cls = "border-success bg-success/10";
            else if (submitted && isPicked && !isAnswer) cls = "border-primary bg-primary/10";

            return (
              <button
                key={i}
                onClick={() => !submitted && setPicked(i)}
                className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition ${cls}`}
              >
                <span className={`flex h-7 w-7 flex-none items-center justify-center rounded text-xs font-bold ${
                  submitted && isAnswer ? "bg-success text-success-foreground" :
                  submitted && isPicked ? "bg-primary text-primary-foreground" :
                  "bg-secondary text-muted-foreground"
                }`}>{letter}</span>
                <span className="pt-1">{opt}</span>
                {submitted && isAnswer && <Check className="ml-auto h-5 w-5 text-success" />}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`mt-8 flex items-center justify-between rounded-xl border p-4 ${
            isCorrect ? "border-primary/40 bg-primary/10" : "border-destructive/40 bg-destructive/10"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${
                isCorrect ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
              }`}>
                {isCorrect ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-sm font-bold">
                  {isCorrect ? "FINLIT Insight!" : "Incorrect Answer"}
                </div>
                <div className="text-xs text-muted-foreground">{q.insight}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isCorrect && (
                <span className="flex items-center gap-1 rounded-md bg-background/40 px-3 py-1.5 text-xs font-medium">
                  +10 <Coins className="h-3 w-3 text-primary" />
                </span>
              )}
              {!isCorrect && (
                <Button variant="secondary" size="sm">◇ Explain</Button>
              )}
              <Button size="sm" onClick={next}>Continue →</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
