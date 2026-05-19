import type { Metadata } from "next";
import ModuleClient from "./module-client";

export const metadata: Metadata = {
  title: "FINLIT — Module",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ModulePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <ModuleClient searchParams={params} />;
}
