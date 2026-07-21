import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PanelShell, type NavItem } from "@/components/PanelShell";
import { User, Heart, KeyRound } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";

const items: NavItem[] = [
  { to: "/account/profile", label: "Profile", icon: User },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/settings", label: "Change Password", icon: KeyRound },
];

const titles: Record<string, string> = {
  "/account": "My Account",
  "/account/profile": "My Profile",
  "/account/wishlist": "Wishlist",
  "/account/settings": "Change Password",
};

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — ELARA WAVE" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AccountLayout,
});

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <RequireAuth>
      <PanelShell brand="ACCOUNT" items={items} title={titles[pathname] || "Account"}>
        <Outlet />
      </PanelShell>
    </RequireAuth>
  );
}
