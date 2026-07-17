import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";
import { Plus, Edit3, Trash2, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/products")({ component: Products });

const rows = [
  { name: "Mineral Water 500ml", sku: "MIN-500", price: "Rs 60", stock: 4200, status: "Published" },
  { name: "Alkaline Water 1.5L", sku: "ALK-1500", price: "Rs 180", stock: 1180, status: "Published" },
  { name: "Premium Glass 750ml", sku: "PRM-750G", price: "Rs 320", stock: 620, status: "Draft" },
  { name: "19L Alkaline Bulk", sku: "ALK-19L", price: "Rs 300", stock: 240, status: "Published" },
  { name: "5L Family", sku: "FAM-5L", price: "Rs 250", stock: 380, status: "Published" },
];

function Products() {
  return (
    <div className="space-y-6">
      <Panel
        title="All products"
        action={<Btn><Plus className="h-4 w-4" /> Add product</Btn>}
      >
        <TableCard
          rows={rows}
          columns={[
            { key: "name", label: "Product" },
            { key: "sku", label: "SKU" },
            { key: "price", label: "Price" },
            { key: "stock", label: "Stock" },
            {
              key: "status", label: "Status",
              render: (r) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  r.status === "Published" ? "bg-green/15 text-green" : "bg-navy/10 text-navy"
                }`}>{r.status}</span>
              ),
            },
            {
              key: "name" as const, label: "",
              render: () => (
                <div className="flex justify-end gap-2">
                  <Btn variant="ghost"><Eye className="h-3.5 w-3.5" /></Btn>
                  <Btn variant="ghost"><Edit3 className="h-3.5 w-3.5" /></Btn>
                  <Btn variant="danger"><Trash2 className="h-3.5 w-3.5" /></Btn>
                </div>
              ),
              className: "text-right",
            },
          ]}
        />
      </Panel>

      <Panel title="Quick edit — Alkaline Water 1.5L">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Product name" defaultValue="Alkaline Water 1.5L" />
          <Field label="SKU" defaultValue="ALK-1500" />
          <Field label="Price (Rs)" defaultValue="180" />
          <Field label="Stock" defaultValue="1180" />
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea rows={4} defaultValue="Balanced alkaline pH 8.5+ for a smoother, wellness-forward pour." className="mt-2 w-full p-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Btn>Save</Btn>
          <Btn variant="outline">Preview</Btn>
          <Btn variant="ghost">Save as draft</Btn>
          <Btn variant="danger">Delete</Btn>
        </div>
      </Panel>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input {...props} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/80 border border-white/80 text-navy focus:outline-none focus:border-blue" />
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-bold tracking-widest text-text-muted uppercase">{children}</label>;
}
