import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";

export const Route = createFileRoute("/app/paths/pinjol")({
  component: () => (
    <LearningPath
      title="Learning Path 1: Anti-Pinjol Ilegal"
      modules={[
        { label: "Mengenal Pinjol Legal vs Ilegal" },
        { label: "Risiko Pinjol Ilegal" },
        { label: "Cara Melapor Pinjol Ilegal" },
        { label: "Studi Kasus Nyata" },
      ]}
      pathId="pinjol"
    />
  ),
});
