import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { Heart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/lib/api";
import { toast } from "sonner";
import { RequireAuth } from "@/components/RequireAuth";

export const Route = createFileRoute("/account/wishlist")({
  component: () => <RequireAuth><Wishlist /></RequireAuth>,
});

function Wishlist() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["wishlist"], queryFn: () => endpoints.wishlist() });
  const remove = useMutation({
    mutationFn: (id: string | number) => endpoints.wishlistRemove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["wishlist"] }); toast.success("Removed"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Panel title="Wishlist">
      {q.isPending ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden"><div className="aspect-[4/3] bg-white/60 animate-pulse" /><div className="p-4 space-y-3"><div className="h-4 rounded bg-white/60 animate-pulse w-2/3" /><div className="h-3 rounded bg-white/60 animate-pulse w-1/2" /></div></div>
          ))}
        </div>
      ) : q.isError ? (
        <div className="text-center py-12"><p className="text-navy font-semibold">Couldn't load wishlist.</p><Btn onClick={() => q.refetch()} className="mt-3">Try again</Btn></div>
      ) : (q.data ?? []).length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-8 w-8 mx-auto text-text-muted" />
          <p className="mt-3 text-navy font-semibold">Your wishlist is empty</p>
          <Link to="/products" className="mt-3 inline-block text-blue font-semibold">Browse products →</Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(q.data ?? []).map((p) => (
            <article key={p.id} className="glass-card overflow-hidden">
              <div className="aspect-[4/3] bg-bg-light">
                {p.image && <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-navy">{p.title}</h3>
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                </div>
                {p.price != null && <div className="mt-1 shine-text font-extrabold">Rs {p.price}</div>}
                <div className="mt-3 flex gap-2">
                  <Link to="/contact"><Btn>Order</Btn></Link>
                  <Btn variant="ghost" disabled={remove.isPending} onClick={() => remove.mutate(p.id)}>Remove</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
}
