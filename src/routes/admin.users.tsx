import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints, type User } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

function UsersPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "users"], queryFn: () => endpoints.admin.users() });
  const del = useMutation({
    mutationFn: (id: string | number) => endpoints.admin.deleteUser(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "users"] }); toast.success("User deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Panel title="Users">
      {q.isPending ? (
        <div className="h-40 grid place-items-center text-text-muted">Loading…</div>
      ) : q.isError ? (
        <div className="text-center py-10"><p className="text-navy">Couldn't load users.</p><Btn onClick={() => q.refetch()} className="mt-3">Retry</Btn></div>
      ) : (
        <TableCard<User>
          rows={q.data ?? []}
          empty="No users yet"
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role", render: (r) => <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-navy/10 text-navy">{r.role || "user"}</span> },
            { key: "createdAt", label: "Joined" },
            {
              key: "id", label: "", className: "text-right",
              render: (r) => (
                <div className="flex justify-end">
                  <Btn variant="danger" disabled={del.isPending} onClick={() => { if (confirm(`Delete ${r.email}?`)) del.mutate(r.id); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Btn>
                </div>
              ),
            },
          ]}
        />
      )}
    </Panel>
  );
}
