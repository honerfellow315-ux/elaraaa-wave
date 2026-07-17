import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/PanelUI";
import { Bell, Package, Tag, Info } from "lucide-react";

export const Route = createFileRoute("/account/notifications")({ component: Notifications });

const items = [
  { i: Package, t: "Your order #EW-2941 has been delivered", w: "2h ago" },
  { i: Tag, t: "New offer: Family Pack 15% off", w: "Yesterday" },
  { i: Info, t: "Delivery slots for Sunday now open", w: "2d ago" },
  { i: Bell, t: "You subscribed to weekly hydration reminders", w: "1w ago" },
];

function Notifications() {
  return (
    <Panel title="Notifications">
      <ul className="space-y-3">
        {items.map((n, i) => (
          <li key={i} className="glass-card p-4 flex items-start gap-3">
            <div className="grid place-items-center h-10 w-10 rounded-xl bg-brand text-white shine">
              <n.i className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy">{n.t}</p>
              <span className="text-xs text-text-muted">{n.w}</span>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
