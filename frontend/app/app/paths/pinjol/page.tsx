import type { Metadata } from "next";
import { LearningPath } from "@/components/LearningPath";

export const metadata: Metadata = {
  title: "FINLIT — Anti-Pinjol Ilegal",
};

export default function PinjolPathPage() {
  return (
    <LearningPath
      title="Learning Path 1: Anti-Pinjol Ilegal"
      description="Kenali ciri pinjaman online ilegal, pahami risikonya, dan lindungi diri dari jeratan bunga mencekik. Selesaikan setiap modul untuk membuka badge."
      modules={[
        { label: "Mengenal Pinjol Legal vs Ilegal" },
        { label: "Risiko Pinjol Ilegal" },
        { label: "Cara Melapor Pinjol Ilegal" },
        { label: "Studi Kasus Nyata" },
      ]}
      pathId="pinjol"
    />
  );
}
