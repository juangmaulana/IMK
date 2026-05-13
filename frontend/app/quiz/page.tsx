import type { Metadata } from "next";
import QuizClient from "./quiz-client";

export const metadata: Metadata = {
  title: "FINLIT — Quiz",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default function QuizPage({ searchParams }: { searchParams: SearchParams }) {
  return <QuizClient searchParams={searchParams} />;
}
