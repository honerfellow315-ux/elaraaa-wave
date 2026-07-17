import { createFileRoute } from "@tanstack/react-router";
import { StatCard, Panel, TableCard, Btn } from "@/components/PanelUI";
import { Droplet, Calendar, Star, Wallet } from "lucide-react";

export const Route = createFileRoute("/account/")({ component: Dashboard });

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-6 sm:p-8 shine">
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-blue">WELCOME BACK</p>
            <h2 className="mt-1 text-3xl font-extrabold text-navy">Hi, Ahsan 👋</h2>
            <p className="mt-1 text-sm text-text-muted">Your next delivery is scheduled for <span className="font-semibold text-navy">tomorrow, 10 AM</span>.</p>
          </div>
          <Btn>Reorder last</Btn>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Bottles this month" value="12" icon={Droplet} />
        <StatCard label="Next delivery" value="Tomorrow" icon={Calendar} />
        <StatCard label="Loyalty points" value="480" icon={Star} />
        <StatCard label="Wallet" value="Rs 1,250" icon={Wallet} />
      </div>
      <Panel title="Recent orders">
        <TableCard
          rows={[
            { id: "#EW-2941", date: "Jul 14", items: "2× 19L Alkaline", total: "Rs 700", status: "Delivered" },
            { id: "#EW-2933", date: "Jul 07", items: "1× 5L Family (3)", total: "Rs 750", status: "Delivered" },
            { id: "#EW-2921", date: "Jun 30", items: "2× 19L Mineral", total: "Rs 600", status: "Delivered" },
          ]}
          columns={[
            { key: "id", label: "Order" },
            { key: "date", label: "Date" },
            { key: "items", label: "Items" },
            { key: "total", label: "Total" },
            {
              key: "status", label: "Status",
              render: (r) => <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green/15 text-green">{r.status}</span>,
            },
          ]}
        />
      </Panel>
    </div>
  );
}
