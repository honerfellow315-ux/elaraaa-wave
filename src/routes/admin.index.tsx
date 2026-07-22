import { createFileRoute } from "@tanstack/react-router";
import { StatCard, Panel, Btn } from "@/components/PanelUI";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { Users, TrendingUp, Mail, Inbox, Palette } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/lib/api";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const q = useQuery({ queryKey: ["admin", "stats"], queryFn: () => endpoints.admin.stats() });

  const fmt = (n?: number) => (n == null ? "—" : n.toLocaleString());
  const s = q.data ?? {};
const stats = [
  { label: "Customers", value: fmt(s.users), icon: Users },
  { label: "Subscribers", value: fmt(s.subscribers), icon: Mail },
  { label: "Messages", value: fmt(s.messages), icon: Inbox },
  { label: "Products", value: fmt(s.products), icon: TrendingUp },
  { label: "Branding Requests", value: fmt(s.orders), icon: Palette },
];
  return (
    <div className="space-y-8">
      {q.isError && (
        <Panel title="Dashboard">
          <p className="text-navy">Couldn't load stats. {(q.error as Error).message}</p>
          <div className="mt-3"><Btn onClick={() => q.refetch()}>Retry</Btn></div>
        </Panel>
      )}
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((st) => (
          <StaggerItem key={st.label}>
            {q.isPending ? (
              <div className="glass-card p-5 h-[110px] animate-pulse bg-white/60" />
            ) : (
              <StatCard label={st.label} value={st.value} icon={st.icon} />
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
