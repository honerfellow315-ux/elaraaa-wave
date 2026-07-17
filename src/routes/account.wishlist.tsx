import { createFileRoute } from "@tanstack/react-router";
import { Panel, Btn } from "@/components/PanelUI";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/account/wishlist")({ component: Wishlist });

const items = [
  { n: "Alkaline 1.5L", price: "Rs 180", img: "/images/alkaline-water.png" },
  { n: "Premium Glass 750ml", price: "Rs 320", img: "/images/primium-water.png" },
  { n: "19L Alkaline Bulk", price: "Rs 300", img: "/images/bottle-real-1.jpeg" },
];

function Wishlist() {
  return (
    <Panel title="Wishlist">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <article key={i.n} className="glass-card overflow-hidden">
            <div className="aspect-[4/3] bg-bg-light"><img src={i.img} alt={i.n} loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-navy">{i.n}</h3>
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </div>
              <div className="mt-1 shine-text font-extrabold">{i.price}</div>
              <div className="mt-3 flex gap-2">
                <Btn>Order</Btn>
                <Btn variant="ghost">Remove</Btn>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
