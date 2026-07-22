import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Trash2, X } from "lucide-react";import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints, type ContactMessage } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/messages")({ component: Messages });

function Messages() {
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "messages"], queryFn: () => endpoints.admin.messages() });
  const del = useMutation({
    mutationFn: (id: string | number) => endpoints.admin.deleteMessage(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "messages"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <Panel title="Contact messages">
        {q.isPending ? (
          <div className="h-40 grid place-items-center text-text-muted">Loading…</div>
        ) : q.isError ? (
          <div className="text-center py-10"><p className="text-navy">Couldn't load.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></div>
        ) : (
          <TableCard<ContactMessage>
            rows={q.data ?? []}
            empty="No messages yet"
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
              { key: "subject", label: "Subject", render: (r) => r.subject || "—" },
              {
                key: "message", label: "Message",
                render: (r) => (
                  <button
                    onClick={() => setSelected(r)}
                    className="line-clamp-2 max-w-md block text-left hover:underline decoration-blue underline-offset-2 cursor-pointer"
                  >
                    {r.message}
                  </button>
                ),
              },
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

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-navy/40 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div className="glass-card max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-full bg-white/70 hover:bg-white text-navy"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold text-navy pr-8">{selected.subject || "Message"}</h3>
            <p className="mt-1 text-xs text-text-muted">{selected.name} · {selected.email}</p>
            <p className="mt-4 text-sm text-navy whitespace-pre-wrap leading-relaxed">{selected.message}</p>
          </div>
        </div>
      )}
    </>
  );
}