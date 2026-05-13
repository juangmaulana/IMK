import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "FINLIT — Home" }] }),
  component: () => <Landing signedIn />,
});
