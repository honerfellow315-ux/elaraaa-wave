import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { endpoints, type SeoSettings } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/seo")({ component: SEO });

function SEO() {
  const q = useQuery({ queryKey: ["admin", "seo"], queryFn: () => endpoints.admin.getSeo() });
  const [form, setForm] = useState<SeoSettings>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (q.data) setForm(q.data); }, [q.data]);

  const upd = (k: keyof SeoSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save() {
    setSaving(true);
    try { const s = await endpoints.admin.saveSeo(form); setForm(s); toast.success("SEO saved"); }
    catch (e) { toast.error((e as Error).message); }
    finally { setSaving(false); }
  }

  if (q.isPending) return <Panel title="SEO"><div className="h-32 grid place-items-center text-text-muted">Loading…</div></Panel>;
  if (q.isError) return <Panel title="SEO"><p className="text-navy">Couldn't load.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></Panel>;

  return (
    <div className="space-y-6">
      <Panel title="Meta">
        <div className="grid md:grid-cols-2 gap-4">
          <F l="Meta title" v={form.title || ""} onChange={upd("title")} />
          <F l="Meta description" v={form.description || ""} onChange={upd("description")} />
          <F l="Keywords" v={form.keywords || ""} onChange={upd("keywords")} />
          <F l="Canonical URL" v={form.canonical || ""} onChange={upd("canonical")} />
          <F l="OG Image" v={form.ogImage || ""} onChange={upd("ogImage")} />
          <F l="Favicon" v={form.favicon || ""} onChange={upd("favicon")} />
        </div>
      </Panel>
      <Panel title="Robots & sitemap">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-text-muted uppercase">robots.txt</label>
            <textarea rows={6} value={form.robots || ""} onChange={upd("robots")} className="mt-2 w-full p-4 font-mono text-sm rounded-xl bg-white/80 border border-white/80 text-navy" />
          </div>
          <F l="Sitemap URL" v={form.sitemap || ""} onChange={upd("sitemap")} />
        </div>
        <div className="mt-6 flex gap-2"><Btn disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</Btn></div>
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
