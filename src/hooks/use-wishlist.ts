import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

// Per-user wishlist stored in localStorage. Keyed by the current user id so
// user A never sees user B's wishlist.
function keyFor(userId: string | number | undefined) {
  return userId ? `ew_wishlist_${userId}` : null;
}

function read(userId: string | number | undefined): string[] {
  if (typeof window === "undefined") return [];
  const k = keyFor(userId);
  if (!k) return [];
  try {
    const raw = window.localStorage.getItem(k);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const { user, status } = useAuth();
  const userId = user?.id;
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(read(userId));
  }, [userId]);

  const persist = useCallback(
    (next: string[]) => {
      const k = keyFor(userId);
      if (!k) return;
      window.localStorage.setItem(k, JSON.stringify(next));
      setItems(next);
    },
    [userId],
  );

  const isSaved = useCallback((id: string) => items.includes(id), [items]);

  const toggle = useCallback(
    (id: string) => {
      const next = items.includes(id) ? items.filter((x) => x !== id) : [...items, id];
      persist(next);
    },
    [items, persist],
  );

  return {
    isAuthenticated: status === "authenticated",
    isSaved,
    toggle,
    items,
  };
}
