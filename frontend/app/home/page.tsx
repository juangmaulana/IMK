import type { Metadata } from "next";
import { Landing } from "@/components/Landing";

export const metadata: Metadata = {
  title: "FINLIT — Home",
};

export default function HomePage() {
  return <Landing signedIn />;
}
