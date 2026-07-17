import { createFileRoute } from "@tanstack/react-router";
import { Panel, TableCard, Btn } from "@/components/PanelUI";

export const Route = createFileRoute("/account/orders")({ component: Orders });

function Orders() {
  const rows = [
    { id: "#EW-2941", date: "Jul 14, 2026", items: "2× 19L Alkaline", total: "Rs 700", status: "Delivered" },
    { id: "#EW-2933", date: "Jul 07, 2026", items: "1× 5L Family (3)", total: "Rs 750", status: "Delivered" },
    { id: "#EW-2921", date: "Jun 30, 2026", items: "2× 19L Mineral", total: "Rs 600", status: "Delivered" },
    { id: "#EW-2908", date: "Jun 20, 2026", items: "6× 1.5L Premium", total: "Rs 1,080", status: "Delivered" },
  ];
  return (
    <Panel title="All orders">
      <TableCard
        rows={rows}
        columns={[
          { key: "id", label: "Order" },
          { key: "date", label: "Date" },
          { key: "items", label: "Items" },
          { key: "total", label: "Total" },
          {
            key: "status", label: "Status",
            render: (r) => <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green/15 text-green">{r.status}</span>,
          },
          {
            key: "id" as const, label: "",
            render: () => <div className="flex justify-end"><Btn variant="outline">Reorder</Btn></div>,
            className: "text-right",
          },
        ]}
      />
    </Panel>
  );
}
