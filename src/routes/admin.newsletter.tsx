import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn, StatCard } from "@/components/PanelUI";
import { Mail, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/newsletter")({ component: Newsletter });

const rows = [
  { email: "ahsan@example.com", joined: "Jul 10, 2026", source: "Popup" },
  { email: "sana@example.com", joined: "Jul 08, 2026", source: "Footer" },
  { email: "bilal@brand.co", joined: "Jul 04, 2026", source: "Homepage" },
];

function Newsletter() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Subscribers" value="1,284" delta="+42" icon={Users} />
        <StatCard label="Open rate" value="38.4%" delta="+2.1%" icon={TrendingUp} />
        <StatCard label="Campaigns" value="14" icon={Mail} />
      </div>
      <Panel title="Compose campaign">
        <div className="space-y-3">
          <F l="Subject" v="Fresh drops from ELARAWAVE" />
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">Body</label>
            <textarea rows={6} defaultValue={"Hi {{name}},\n\nHere's what's new this week..."} className="mt-2 w-full p-4 rounded-xl bg-white/80 border border-white/80 text-navy" />
          </div>
        </div>
        <div className="mt-6 flex gap-2"><Btn>Send</Btn><Btn variant="outline">Save draft</Btn><Btn variant="ghost">Preview</Btn></div>
      </Panel>
      <Panel title="Subscribers">
        <TableCard
          rows={rows}
          columns={[
            { key: "email", label: "Email" },
            { key: "joined", label: "Joined" },
            { key: "source", label: "Source" },
          ]}
        />
      </Panel>
    </div>
  );
}

function F({ l, v }: { l: string; v: string }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest text-text-muted uppercase">{l}</label>
      <input defaultValue={v} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue" />
    </div>
  );
}
