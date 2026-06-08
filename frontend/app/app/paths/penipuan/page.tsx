import type { Metadata } from "next";
import { LearningPath } from "@/components/LearningPath";

export const metadata: Metadata = {
  title: "FINLIT — Penipuan Digital",
};

export default function PenipuanPathPage() {
  return (
    <LearningPath
      title="Learning Path 2: Penipuan Digital & Aktivitas Keuangan Ilegal"
      description="Pelajari modus scam digital, investasi bodong, deepfake, dan cara melindungi aset keuangan Anda dari ancaman siber. Selesaikan setiap modul untuk membuka badge."
      modules={[
        { label: "Jenis-Jenis Scam Digital" },
        { label: "Investasi Bodong Digital" },
        { label: "Modus Penipuan Belanja Daring & E-Wallet" },
        { label: "Deepfake & AI-Generated Scam" },
        { label: "Cara Melaporkan & Melindungi Diri" },
      ]}
      pathId="penipuan"
    />
  );
}
