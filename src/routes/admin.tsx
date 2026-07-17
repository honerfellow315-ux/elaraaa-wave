import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PanelShell, type NavItem } from "@/components/PanelShell";
import {
  LayoutDashboard, Package, Palette, Home, Users, UserCog,
  MessageSquare, Search, Settings, Image, Mail, BarChart3,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/custom-branding", label: "Custom Branding", icon: Palette },
  { to: "/admin/homepage", label: "Homepage", icon: Home },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/users", label: "Users", icon: UserCog },
  { to: "/admin/messages", label: "Contact Messages", icon: MessageSquare },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/custom-branding": "Custom Branding",
  "/admin/homepage": "Homepage",
  "/admin/customers": "Customers",
  "/admin/users": "Users",
  "/admin/messages": "Contact Messages",
  "/admin/seo": "SEO",
  "/admin/settings": "Settings",
  "/admin/media": "Media Library",
  "/admin/newsletter": "Newsletter",
  "/admin/analytics": "Analytics",
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ELARAWAVE" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = titles[pathname] || "Admin";
  return (
    <PanelShell brand="ADMIN" items={items} title={title}>
      <Outlet />
    </PanelShell>
  );
}
