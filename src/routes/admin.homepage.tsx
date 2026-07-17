import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";

export const Route = createFileRoute("/admin/homepage")({ component: HomepageAdmin });

function HomepageAdmin() {
  return (
    <div className="space-y-6">
      <Panel title="Hero section">
        <div className="grid md:grid-cols-2 gap-4">
          <F l="Eyebrow" v="Premium Alkaline & Mineral Water" />
          <F l="Headline" v="Flow With Freshness" />
          <F l="Sub headline" v="ELARAWAVE bottles the calm of pure mountain water." />
          <F l="Primary CTA" v="Order Now" />
          <F l="Primary CTA link" v="/contact" />
          <F l="Hero image" v="/images/hero-bg-image.webp" />
        </div>
        <div className="mt-6 flex gap-2"><Btn>Save</Btn><Btn variant="outline">Preview</Btn><Btn variant="ghost">Publish</Btn></div>
      </Panel>

      <Panel title="Product cards (home)">
        <ul className="grid sm:grid-cols-2 gap-3">
          {["Mineral Water", "Alkaline Water", "Premium Water", "19L + 5L Bottles"].map((n) => (
            <li key={n} className="glass-card p-4 flex items-center justify-between">
              <span className="font-semibold text-navy">{n}</span>
              <Btn variant="outline">Edit</Btn>
            </li>
          ))}
        </ul>
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
