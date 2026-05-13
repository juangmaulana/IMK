import type { Metadata } from "next";
import ModuleClient from "./module-client";

export const metadata: Metadata = {
  title: "FINLIT — Module",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default function ModulePage({ searchParams }: { searchParams: SearchParams }) {
  return <ModuleClient searchParams={searchParams} />;
}
