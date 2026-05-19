import type { Metadata } from "next";
import QuizClient from "./quiz-client";

export const metadata: Metadata = {
  title: "FINLIT — Quiz",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function QuizPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <QuizClient searchParams={params} />;
}
