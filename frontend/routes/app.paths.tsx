import { createFileRoute, Outlet, Navigate, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/app/paths")({
  component: PathsLayout,
});

function PathsLayout() {
  const { pathname } = useLocation();
  if (pathname === "/app/paths") return <Navigate to="/app/paths/pinjol" />;
  return <Outlet />;
}
