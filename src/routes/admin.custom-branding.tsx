import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { Plus, Edit3, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/custom-branding")({ component: BrandingAdmin });

const projects = [
  { n: "Timmy Tiles", s: "Live", img: "/images/project-timmy-tiles.webp" },
  { n: "Timmy Sanitary", s: "Live", img: "/images/project-timmy-sanitary.webp" },
  { n: "Sapphire Sports", s: "Live", img: "/images/project-sapphire-sports.webp" },
  { n: "Project Four", s: "Draft", img: "/images/project-four.webp" },
  { n: "Project Five", s: "Live", img: "/images/project-five.webp" },
];

function BrandingAdmin() {
  return (
    <Panel title="Portfolio" action={<Btn><Plus className="h-4 w-4" /> New project</Btn>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.n} className="glass-card overflow-hidden">
            <div className="aspect-[3/2] bg-bg-light">
              <img src={p.img} alt={p.n} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-navy">{p.n}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.s === "Live" ? "bg-green/15 text-green" : "bg-navy/10 text-navy"}`}>{p.s}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Btn variant="outline"><Edit3 className="h-3.5 w-3.5" /> Edit</Btn>
                <Btn variant="danger"><Trash2 className="h-3.5 w-3.5" /></Btn>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
