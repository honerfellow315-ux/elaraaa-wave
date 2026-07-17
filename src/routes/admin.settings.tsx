import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

function Settings() {
  return (
    <div className="space-y-6">
      <Panel title="Brand">
        <div className="grid md:grid-cols-2 gap-4">
          <F l="Brand name" v="ELARAWAVE" />
          <F l="Tagline" v="Flow With Freshness" />
          <F l="Primary phone" v="0309 6419731" />
          <F l="Support email" v="hello@elarawave.com" />
          <F l="Address" v="Lahore, Pakistan" />
          <F l="Currency" v="PKR" />
        </div>
        <div className="mt-6"><Btn>Save changes</Btn></div>
      </Panel>
      <Panel title="Preferences">
        <div className="space-y-3">
          {[
            "Email order confirmations",
            "SMS delivery updates",
            "Weekly analytics digest",
            "Enable WhatsApp float button",
            "Enable visitor popup",
          ].map((t, i) => (
            <label key={t} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/70">
              <span className="text-sm text-navy font-medium">{t}</span>
              <input type="checkbox" defaultChecked={i < 3 || i === 3 || i === 4} className="h-5 w-9 appearance-none rounded-full bg-navy/20 checked:bg-brand relative transition-all cursor-pointer before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all checked:before:translate-x-4" />
            </label>
          ))}
        </div>
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
