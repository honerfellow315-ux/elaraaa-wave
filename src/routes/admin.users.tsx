import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: Users });

const rows = [
  { name: "Owner", email: "owner@elarawave.com", role: "Owner", status: "Active" },
  { name: "Ali (Ops)", email: "ali@elarawave.com", role: "Admin", status: "Active" },
  { name: "Aisha (Support)", email: "aisha@elarawave.com", role: "Support", status: "Active" },
  { name: "Rider App", email: "rider@elarawave.com", role: "Driver", status: "Invited" },
];

function Users() {
  return (
    <Panel title="Team users" action={<Btn><Plus className="h-4 w-4" /> Invite user</Btn>}>
      <TableCard
        rows={rows}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                r.status === "Active" ? "bg-green/15 text-green" : "bg-yellow-500/15 text-yellow-700"
              }`}>{r.status}</span>
            ),
          },
        ]}
      />
    </Panel>
  );
}
