import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Reply, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({ component: Messages });

const rows = [
  { from: "Zara Aslam", email: "zara@example.com", subject: "Weekly plan pricing", when: "2h ago", unread: true },
  { from: "Bilal Khan", email: "bilal@brand.co", subject: "Custom wedding labels", when: "5h ago", unread: true },
  { from: "Sana Riaz", email: "sana@example.com", subject: "Missed delivery slot", when: "Yesterday", unread: false },
  { from: "Ahsan Malik", email: "ahsan@example.com", subject: "Change subscription", when: "2d ago", unread: false },
];

function Messages() {
  return (
    <Panel title="Contact messages">
      <TableCard
        rows={rows}
        columns={[
          {
            key: "from", label: "From",
            render: (r) => (
              <div className="flex items-center gap-2">
                {r.unread && <span className="h-2 w-2 rounded-full bg-blue" />}
                <div>
                  <div className="font-semibold text-navy">{r.from}</div>
                  <div className="text-xs text-text-muted">{r.email}</div>
                </div>
              </div>
            ),
          },
          { key: "subject", label: "Subject" },
          { key: "when", label: "Received" },
          {
            key: "from" as const, label: "",
            render: () => (
              <div className="flex justify-end gap-2">
                <Btn variant="ghost"><Reply className="h-3.5 w-3.5" /> Reply</Btn>
                <Btn variant="danger"><Trash2 className="h-3.5 w-3.5" /></Btn>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />
    </Panel>
  );
}
