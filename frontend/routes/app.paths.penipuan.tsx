import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";

export const Route = createFileRoute("/app/paths/penipuan")({
  component: () => (
    <LearningPath
      title="Learning Path 2: Penipuan Digital & Aktivitas Keuangan Ilegal"
      modules={[
        { label: "Jenis-Jenis Scam Digital" },
        { label: "Investasi Bodong Digital" },
        { label: "Modus Penipuan Belanja Daring & E-Wallet" },
        { label: "Deepfake & AI-Generated Scam" },
        { label: "Cara Melaporkan & Melindungi Diri" },
      ]}
      pathId="penipuan"
    />
  ),
});
