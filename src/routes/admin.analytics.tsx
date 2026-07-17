import { createFileRoute } from "@tanstack/react-router";
import { Panel, StatCard } from "@/components/PanelUI";
import { Eye, Users, TrendingUp, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({ component: Analytics });

function Analytics() {
  const data = [40, 55, 48, 62, 70, 58, 78, 85, 74, 90, 82, 96];
  const max = Math.max(...data);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sessions" value="24,812" delta="+11.2%" icon={Users} />
        <StatCard label="Page views" value="78,410" delta="+8.4%" icon={Eye} />
        <StatCard label="Avg. session" value="3m 24s" delta="+18s" icon={Clock} />
        <StatCard label="Conversion" value="4.8%" delta="+0.6%" icon={TrendingUp} />
      </div>
      <Panel title="Traffic — last 12 weeks">
        <svg viewBox="0 0 400 140" className="w-full h-56">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3E9AD6" stopOpacity=".6" />
              <stop offset="1" stopColor="#3E9AD6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const pts = data.map((v, i) => `${(i / (data.length - 1)) * 400},${140 - (v / max) * 120 - 10}`);
            const path = `M${pts[0]} ${pts.slice(1).map(p => `L${p}`).join(" ")}`;
            return (
              <>
                <path d={`${path} L400,140 L0,140 Z`} fill="url(#g)" />
                <path d={path} fill="none" stroke="#123A5E" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              </>
            );
          })()}
        </svg>
      </Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          <ul className="space-y-3 text-sm">
            {[
              ["/", 12480],["/products", 6210],["/custom-branding", 3120],["/contact", 2210],["/about", 1830],
            ].map(([p, v]) => (
              <li key={p as string} className="flex items-center justify-between">
                <span className="font-mono text-navy">{p}</span>
                <span className="text-text-muted">{(v as number).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Traffic sources">
          <ul className="space-y-4">
            {[["Direct", 42],["Search", 31],["Social", 18],["Referral", 9]].map(([n, v]) => (
              <li key={n as string}>
                <div className="flex justify-between text-sm"><span className="text-navy font-semibold">{n}</span><span className="text-text-muted">{v as number}%</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-bg-light overflow-hidden">
                  <div className="h-full bg-brand shine" style={{ width: `${v as number}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
