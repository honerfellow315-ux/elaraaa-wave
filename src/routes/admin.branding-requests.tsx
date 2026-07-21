import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints, type BrandingRequest } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/branding-requests")({ component: BrandingRequests });

function BrandingRequests() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "branding-requests"], queryFn: () => endpoints.admin.brandingRequests() });
  const del = useMutation({
    mutationFn: (id: string | number) => endpoints.admin.deleteBrandingRequest(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "branding-requests"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Panel title="Branding requests">
      {q.isPending ? (
        <div className="h-40 grid place-items-center text-text-muted">Loading…</div>
      ) : q.isError ? (
        <div className="text-center py-10"><p className="text-navy">Couldn't load.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></div>
      ) : (
        <TableCard<BrandingRequest>
          rows={q.data ?? []}
          empty="No branding requests yet"
          columns={[
            {
              key: "name", label: "From",
              render: (r) => (
                <div className="flex items-center gap-2">
                  {!r.read && <span className="h-2 w-2 rounded-full bg-blue" />}
                  <div>
                    <div className="font-semibold text-navy">{r.name}</div>
                    <div className="text-xs text-text-muted">{r.email}</div>
                  </div>
                </div>
              ),
            },
            { key: "brand", label: "Brand" },
            { key: "size", label: "Size" },
            { key: "quantity", label: "Quantity" },
            { key: "brief", label: "Brief", render: (r) => <span className="line-clamp-2 max-w-md block">{r.brief}</span> },
            { key: "createdAt", label: "Received" },
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
  );
}