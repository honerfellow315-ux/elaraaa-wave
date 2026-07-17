import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";

export const Route = createFileRoute("/admin/seo")({ component: SEO });

function SEO() {
  return (
    <div className="space-y-6">
      <Panel title="Meta">
        <div className="grid md:grid-cols-2 gap-4">
          <F l="Meta title" v="ELARAWAVE — Flow With Freshness" />
          <F l="Meta description" v="Premium alkaline & mineral water delivered fresh across Lahore." />
          <F l="Keywords" v="water, alkaline, mineral, lahore, delivery" />
          <F l="Canonical URL" v="https://elarawave.com" />
          <F l="OG Image" v="/images/hero-bg-image.webp" />
          <F l="Favicon" v="/favicon.ico" />
        </div>
      </Panel>
      <Panel title="Robots & sitemap">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">robots.txt</label>
            <textarea rows={6} defaultValue={"User-agent: *\nAllow: /\nSitemap: /sitemap.xml"} className="mt-2 w-full p-4 font-mono text-sm rounded-xl bg-white/80 border border-white/80 text-navy" />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">Sitemap URL</label>
            <input defaultValue="/sitemap.xml" className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy" />
          </div>
        </div>
        <div className="mt-6 flex gap-2"><Btn>Save</Btn><Btn variant="outline">Preview</Btn></div>
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
