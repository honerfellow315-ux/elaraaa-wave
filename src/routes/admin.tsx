import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PanelShell, type NavItem } from "@/components/PanelShell";
import { AdminAuthGate } from "@/components/AdminAuthGate";
import {
  LayoutDashboard, Users, Mail, Search, MessageSquare, Settings, Palette,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "View Users", icon: Users },
  { to: "/admin/newsletter", label: "Newsletter Subscribers", icon: Mail },
  { to: "/admin/seo", label: "SEO Settings", icon: Search },
  { to: "/admin/messages", label: "Contact Messages", icon: MessageSquare },
  { to: "/admin/branding-requests", label: "Branding Requests", icon: Palette },
  { to: "/admin/settings", label: "Website Settings", icon: Settings },
];

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/users": "Users",
  "/admin/newsletter": "Newsletter Subscribers",
  "/admin/seo": "SEO Settings",
  "/admin/messages": "Contact Messages",
  "/admin/branding-requests": "Branding Requests",
  "/admin/settings": "Website Settings",
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ELARAWAVE" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titles[pathname] || "Admin";
  return (
    <AdminAuthGate>
      <PanelShell brand="ADMIN" items={items} title={title}>
        <Outlet />
      </PanelShell>
    </AdminAuthGate>
  );
}