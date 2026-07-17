import { createFileRoute } from "@tanstack/react-router";
import { StatCard, Panel, TableCard, Btn } from "@/components/PanelUI";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Users, Package, DollarSign, TrendingUp, Eye, Edit3 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Revenue (30d)", value: "Rs 842,500", delta: "+12.4%", icon: DollarSign },
    { label: "Orders", value: "1,284", delta: "+8.1%", icon: Package },
    { label: "Customers", value: "512", delta: "+21", icon: Users },
    { label: "Conversion", value: "4.8%", delta: "+0.6%", icon: TrendingUp },
  ];
  const recent = [
    { id: "#EW-2941", customer: "Ahsan Malik", items: "2× 19L Alkaline", total: "Rs 700", status: "Delivered" },
    { id: "#EW-2940", customer: "Sana Riaz", items: "1× 500ml Premium (12)", total: "Rs 1,440", status: "Dispatched" },
    { id: "#EW-2939", customer: "Timmy Tiles", items: "Custom labels (500)", total: "Rs 45,000", status: "In production" },
    { id: "#EW-2938", customer: "Zara Aslam", items: "3× 5L Family", total: "Rs 750", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (<StaggerItem key={s.label}><StatCard {...s} /></StaggerItem>))}
      </Stagger>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Panel title="Sales — last 7 days">
            <div className="h-64 flex items-end gap-3">
              {[38, 52, 47, 70, 62, 84, 76].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-brand shine relative overflow-hidden"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-text-muted">{["Mo","Tu","We","Th","Fr","Sa","Su"][i]}</span>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
        <Reveal>
          <Panel title="Top products">
            <ul className="space-y-4">
              {[
                { n: "Alkaline 19L", v: 412, p: 84 },
                { n: "Mineral 19L", v: 356, p: 74 },
                { n: "Premium 500ml", v: 218, p: 56 },
                { n: "5L Family", v: 142, p: 38 },
              ].map((p) => (
                <li key={p.n}>
                  <div className="flex justify-between text-sm"><span className="text-navy font-semibold">{p.n}</span><span className="text-text-muted">{p.v}</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-bg-light overflow-hidden">
                    <div className="h-full bg-fresh shine" style={{ width: `${p.p}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>

      <Reveal>
        <Panel
          title="Recent orders"
          action={<Btn variant="ghost">View all</Btn>}
        >
          <TableCard
            columns={[
              { key: "id", label: "Order" },
              { key: "customer", label: "Customer" },
              { key: "items", label: "Items" },
              { key: "total", label: "Total" },
              {
                key: "status", label: "Status",
                render: (r) => (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    r.status === "Delivered" ? "bg-green/15 text-green" :
                    r.status === "Dispatched" ? "bg-blue/15 text-blue" :
                    r.status === "Pending" ? "bg-yellow-500/15 text-yellow-700" :
                    "bg-navy/10 text-navy"
                  }`}>{r.status}</span>
                ),
              },
              {
                key: "id" as const, label: "",
                render: () => (
                  <div className="flex justify-end gap-2">
                    <Btn variant="ghost"><Eye className="h-3.5 w-3.5" />View</Btn>
                    <Btn variant="ghost"><Edit3 className="h-3.5 w-3.5" />Edit</Btn>
                  </div>
                ),
                className: "text-right",
              },
            ]}
            rows={recent}
          />
        </Panel>
      </Reveal>
    </div>
  );
}
