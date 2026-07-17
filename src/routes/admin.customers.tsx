import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Eye, Edit3 } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({ component: Customers });

const rows = [
  { name: "Ahsan Malik", email: "ahsan@example.com", orders: 12, spent: "Rs 42,300", status: "Active" },
  { name: "Sana Riaz", email: "sana@example.com", orders: 8, spent: "Rs 18,120", status: "Active" },
  { name: "Zara Aslam", email: "zara@example.com", orders: 3, spent: "Rs 5,250", status: "New" },
  { name: "Timmy Tiles", email: "ops@timmytiles.com", orders: 22, spent: "Rs 210,400", status: "VIP" },
];

function Customers() {
  return (
    <Panel title="Customers">
      <TableCard
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "orders", label: "Orders" },
          { key: "spent", label: "Lifetime spend" },
          {
            key: "status", label: "Tier",
            render: (r) => (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                r.status === "VIP" ? "bg-brand text-white shine" :
                r.status === "New" ? "bg-blue/15 text-blue" : "bg-green/15 text-green"
              }`}>{r.status}</span>
            ),
          },
          {
            key: "name" as const, label: "",
            render: () => (
              <div className="flex justify-end gap-2">
                <Btn variant="ghost"><Eye className="h-3.5 w-3.5" /></Btn>
                <Btn variant="ghost"><Edit3 className="h-3.5 w-3.5" /></Btn>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />
    </Panel>
  );
}
