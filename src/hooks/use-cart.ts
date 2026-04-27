import { useSyncExternalStore } from "react";

export type Size = "500ml" | "1L" | "1/2 gal";
export const SIZE_PRICE: Record<Size, number> = {
  "500ml": 4.5,
  "1L": 7.0,
  "1/2 gal": 15,
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  size: Size;
  price: number;
  img: string;
  qty: number;
};

type Listener = () => void;
const listeners = new Set<Listener>();
let items: CartItem[] = [];
const EMPTY_CART: CartItem[] = [];

const STORAGE_KEY = "verde-cart-v1";

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = [];
  }
}
load();

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return items;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function addItem(input: Omit<CartItem, "id" | "qty"> & { qty?: number }) {
  const id = `${input.productId}-${input.size}`;
  const existing = items.find((i) => i.id === id);
  if (existing) {
    items = items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + (input.qty ?? 1) } : i,
    );
  } else {
    items = [...items, { ...input, id, qty: input.qty ?? 1 }];
  }
  emit();
}

export function updateQty(id: string, qty: number) {
  if (qty <= 0) {
    items = items.filter((i) => i.id !== id);
  } else {
    items = items.map((i) => (i.id === id ? { ...i, qty } : i));
  }
  emit();
}

export function removeItem(id: string) {
  items = items.filter((i) => i.id !== id);
  emit();
}

export function clearCart() {
  items = [];
  emit();
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return { items, count, subtotal };
}

// Drawer open state
let drawerOpen = false;
const drawerListeners = new Set<Listener>();
function emitDrawer() {
  drawerListeners.forEach((l) => l());
}
export function openCart() {
  drawerOpen = true;
  emitDrawer();
}
export function closeCart() {
  drawerOpen = false;
  emitDrawer();
}
export function useCartDrawer() {
  return useSyncExternalStore(
    (l) => {
      drawerListeners.add(l);
      return () => drawerListeners.delete(l);
    },
    () => drawerOpen,
    () => false,
  );
}
