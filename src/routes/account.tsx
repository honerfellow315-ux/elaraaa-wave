import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PanelShell, type NavItem } from "@/components/PanelShell";
import { LayoutDashboard, ShoppingBag, MapPin, Bell, Heart, Settings, User } from "lucide-react";

const items: NavItem[] = [
  { to: "/account", label: "Dashboard", icon: LayoutDashboard },
  { to: "/account/orders", label: "Order History", icon: ShoppingBag },
  { to: "/account/profile", label: "Profile", icon: User },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  { to: "/account/notifications", label: "Notifications", icon: Bell },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/settings", label: "Settings", icon: Settings },
];

const titles: Record<string, string> = {
  "/account": "My Dashboard",
  "/account/orders": "Order History",
  "/account/profile": "My Profile",
  "/account/addresses": "Addresses",
  "/account/notifications": "Notifications",
  "/account/wishlist": "Wishlist",
  "/account/settings": "Settings",
};

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — ELARAWAVE" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AccountLayout,
});

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <PanelShell brand="ACCOUNT" items={items} title={titles[pathname] || "Account"}>
      <Outlet />
    </PanelShell>
  );
}
