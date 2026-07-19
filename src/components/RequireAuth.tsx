import { useEffect, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export function RequireAuth({
  children,
  admin = false,
}: {
  children: ReactNode;
  admin?: boolean;
}) {
  const { user, status, isAdmin } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      void navigate({ to: "/login", search: { redirect: pathname } as never });
      return;
    }
    if (admin && !isAdmin) void navigate({ to: "/" });
  }, [status, admin, isAdmin, navigate, pathname]);

  if (status !== "authenticated") {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="glass rounded-2xl px-6 py-4 text-sm text-text-muted">Loading…</div>
      </div>
    );
  }
  if (admin && !isAdmin) return null;
  return <>{children}</>;
}