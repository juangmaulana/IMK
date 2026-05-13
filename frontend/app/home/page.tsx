import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "FINLIT — Home",
};

export default function HomePage() {
  return <HomeClient />;
}
