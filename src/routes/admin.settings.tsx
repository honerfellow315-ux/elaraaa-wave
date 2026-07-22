import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { endpoints, type SiteSettings, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

function Settings() {
  const q = useQuery({ queryKey: ["admin", "settings"], queryFn: () => endpoints.admin.getSettings() });
  const [form, setForm] = useState<SiteSettings>({});
  const [saving, setSaving] = useState(false);
  const [creds, setCreds] = useState({ username: "", currentPassword: "", newPassword: "" });
  const [credsSaving, setCredsSaving] = useState(false);

  useEffect(() => { if (q.data) setForm(q.data); }, [q.data]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save() {
    setSaving(true);
    try { const s = await endpoints.admin.saveSettings(form); setForm(s); toast.success("Settings saved"); }
    catch (e) { toast.error((e as Error).message); }
    finally { setSaving(false); }
  }

  async function saveCreds() {
    if (!creds.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    setCredsSaving(true);
    try {
      await endpoints.admin.changeCredentials({
        username: creds.username || undefined,
        currentPassword: creds.currentPassword,
        newPassword: creds.newPassword || undefined,
      });
      toast.success("Credentials updated");
      setCreds({ username: "", currentPassword: "", newPassword: "" });
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Could not update credentials");
    } finally {
      setCredsSaving(false);
    }
  }

  if (q.isPending) return <Panel title="Settings"><div className="h-32 grid place-items-center text-text-muted">Loading…</div></Panel>;
  if (q.isError) return <Panel title="Settings"><p className="text-navy">Couldn't load.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></Panel>;

  return (
    <div className="space-y-6">
      <Panel title="Brand">
        <div className="grid md:grid-cols-2 gap-4">
          <F l="Brand name" v={(form.brandName as string) || ""} onChange={set("brandName")} />
          <F l="Tagline" v={(form.tagline as string) || ""} onChange={set("tagline")} />
          <F l="Primary phone" v={(form.phone as string) || ""} onChange={set("phone")} />
          <F l="Support email" v={(form.email as string) || ""} onChange={set("email")} />
          <F l="Address" v={(form.address as string) || ""} onChange={set("address")} />
          <F l="Currency" v={(form.currency as string) || ""} onChange={set("currency")} />
        </div>
        <div className="mt-6"><Btn disabled={saving} onClick={save}>{saving ? "Saving…" : "Save changes"}</Btn></div>
      </Panel>

      <Panel title="Change login credentials">
        <p className="text-sm text-text-muted -mt-2 mb-4">
          Leave "New username" or "New password" blank to keep them unchanged. Current password is always required.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">New username (optional)</label>
            <input
              value={creds.username}
              onChange={(e) => setCreds((c) => ({ ...c, username: e.target.value }))}
              className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue"
            />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">New password (optional)</label>
            <input
              type="password"
              value={creds.newPassword}
              onChange={(e) => setCreds((c) => ({ ...c, newPassword: e.target.value }))}
              className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">Current password</label>
            <input
              type="password"
              value={creds.currentPassword}
              onChange={(e) => setCreds((c) => ({ ...c, currentPassword: e.target.value }))}
              className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue"
            />
          </div>
        </div>
        <div className="mt-6">
          <Btn disabled={credsSaving} onClick={saveCreds}>{credsSaving ? "Updating…" : "Update credentials"}</Btn>
        </div>
      </Panel>
    </div>
  );
}

function F({ l, v, onChange }: { l: string; v: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest text-text-muted uppercase">{l}</label>
      <input value={v} onChange={onChange} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue" />
    </div>
  );
}