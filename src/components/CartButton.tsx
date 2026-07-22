import { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

const WHATSAPP_NUMBER = "923096419731";

export function CartButton({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { items, totalItems, totalPrice, updateQty, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  function checkoutOnWhatsapp() {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.name} x${i.qty} — Rs. ${i.price * i.qty}`);
    const message = [
      "Hi ELARA WAVE! I'd like to place this order:",
      "",
      ...lines,
      "",
      `Total: Rs. ${totalPrice}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="View cart"
          className={
            variant === "desktop"
              ? "relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/70 border border-white/70 text-navy text-sm font-semibold hover:bg-white transition"
              : "relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/70 border border-white/70 text-navy hover:bg-white transition"
          }
        >
          <ShoppingCart className="h-4 w-4 text-blue" />
          {variant === "desktop" && <span className="hidden md:inline">Cart</span>}
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-text-muted">
            <ShoppingCart className="h-10 w-10 opacity-30" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto py-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-xl border border-black/5 p-3">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-bg-tint" />
                )}
                <div className="flex flex-1 flex-col min-w-0">
                  <p className="text-sm font-semibold text-navy line-clamp-2">{item.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">Rs. {item.price} each</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-black/10 hover:bg-bg-tint"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-black/10 hover:bg-bg-tint"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="text-text-muted hover:text-red-500 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="mt-auto flex-col gap-3 border-t border-black/5 pt-4 sm:flex-col">
            <div className="flex w-full items-center justify-between text-base font-bold text-navy">
              <span>Total</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <button
              type="button"
              onClick={checkoutOnWhatsapp}
              className="shine inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(18,58,94,0.55)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Checkout on WhatsApp
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}