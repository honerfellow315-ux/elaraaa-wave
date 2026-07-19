import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn, StatCard } from "@/components/PanelUI";
import { Users, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints, type NewsletterSubscriber } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/newsletter")({ component: NewsletterAdmin });

function NewsletterAdmin() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "subscribers"], queryFn: () => endpoints.admin.subscribers() });
  const del = useMutation({
    mutationFn: (id: string | number) => endpoints.admin.deleteSubscriber(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "subscribers"] }); toast.success("Removed"); },
    onError: (e: Error) => toast.error(e.message),
  });
  const rows = q.data ?? [];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-1">
        <StatCard label="Subscribers" value={rows.length.toLocaleString()} icon={Users} />
      </div>
      <Panel title="Subscribers">
        {q.isPending ? (
          <div className="h-32 grid place-items-center text-text-muted">Loading…</div>
        ) : q.isError ? (
          <div className="text-center py-10"><p className="text-navy">Couldn't load.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></div>
        ) : (
          <TableCard<NewsletterSubscriber>
            rows={rows}
            empty="No subscribers yet"
            columns={[
              { key: "email", label: "Email" },
              { key: "createdAt", label: "Joined" },
              { key: "source", label: "Source" },
              {
                key: "id", label: "", className: "text-right",
                render: (r) => (
                  <div className="flex justify-end">
                    <Btn variant="danger" disabled={del.isPending} onClick={() => del.mutate(r.id)}><Trash2 className="h-3.5 w-3.5" /></Btn>
                  </div>
                ),
              },
            ]}
          />
        )}
      </Panel>
    </div>
  );
}
