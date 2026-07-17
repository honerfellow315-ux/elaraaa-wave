import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { MapPin, Plus, Edit3, Trash2 } from "lucide-react";

export const Route = createFileRoute("/account/addresses")({ component: Addresses });

const addresses = [
  { name: "Home", line: "House 24, Street 8, DHA Phase 5, Lahore", default: true },
  { name: "Office", line: "12th Floor, Arfa Software Tech Park, Ferozepur Road, Lahore" },
];

function Addresses() {
  return (
    <Panel title="Saved addresses" action={<Btn><Plus className="h-4 w-4" /> Add address</Btn>}>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.name} className="glass-card p-5">
            <div className="flex items-start gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-brand text-white shine">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy">{a.name}</h4>
                  {a.default && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green/15 text-green">Default</span>}
                </div>
                <p className="mt-1 text-sm text-text-muted">{a.line}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Btn variant="outline"><Edit3 className="h-3.5 w-3.5" /> Edit</Btn>
              <Btn variant="danger"><Trash2 className="h-3.5 w-3.5" /></Btn>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
