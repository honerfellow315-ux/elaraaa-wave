import type { ReactNode } from "react";

export function StatCard({
  label, value, delta, icon: Icon,
}: { label: string; value: string; delta?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-text-muted uppercase">{label}</span>
        {Icon && <div className="grid place-items-center h-9 w-9 rounded-xl bg-brand text-white shine"><Icon className="h-4 w-4" /></div>}
      </div>
      <div className="mt-3 text-3xl font-extrabold text-navy">{value}</div>
      {delta && <div className="mt-1 text-xs font-semibold text-green">{delta}</div>}
    </div>
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="glass-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Btn({
  children, variant = "primary", ...props
}: { variant?: "primary" | "ghost" | "outline" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls =
    variant === "primary"
      ? "shine bg-brand text-white hover:-translate-y-0.5"
      : variant === "ghost"
      ? "bg-white/70 text-navy hover:bg-white"
      : variant === "danger"
      ? "bg-red-500/90 text-white hover:bg-red-500"
      : "bg-white border border-navy/15 text-navy hover:bg-bg-light";
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition ${cls} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function TableCard<T>({
  columns, rows, empty = "No data",
}: {
  columns: { key: keyof T; label: string; render?: (row: T) => ReactNode; className?: string }[];
  rows: T[];
  empty?: string;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] tracking-widest text-text-muted uppercase">
              {columns.map((c) => (
                <th key={String(c.key)} className={`px-5 py-3 font-semibold ${c.className ?? ""}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-5 py-10 text-center text-text-muted">{empty}</td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/70 hover:bg-white/50 transition">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-5 py-4 text-navy ${c.className ?? ""}`}>
                    {c.render ? c.render(r) : (r[c.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
