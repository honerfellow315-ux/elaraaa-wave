import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";

export const Route = createFileRoute("/account/profile")({ component: Profile });

function Profile() {
  return (
    <Panel title="Profile">
      <div className="grid md:grid-cols-2 gap-4">
        <F l="Full name" v="Ahsan Malik" />
        <F l="Email" v="ahsan@example.com" />
        <F l="Phone" v="0300 1234567" />
        <F l="Preferred water" v="Alkaline" />
      </div>
      <div className="mt-6"><Btn>Save changes</Btn></div>
    </Panel>
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
