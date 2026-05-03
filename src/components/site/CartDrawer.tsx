import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  useCart,
  useCartDrawer,
  closeCart,
  updateQty,
  removeItem,
} from "@/hooks/use-cart";
import { useEffect } from "react";

export function CartDrawer() {
  const open = useCartDrawer();
  const { items, count, subtotal } = useCart();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-leaf-deep/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-black text-leaf-deep">
              Tu carrito
            </h2>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-leaf-deep"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-leaf/10 text-leaf-deep">
                <ShoppingBag className="h-9 w-9" />
              </div>
              <p className="mt-6 font-display text-xl font-bold text-leaf-deep">
                Tu carrito está vacío
              </p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Agrega tus sabores favoritos y descubre la frescura embotellada.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  setTimeout(() => {
                    document.getElementById("sabores")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 200);
                }}
                className="mt-8 rounded-full bg-leaf-deep px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf"
              >
                Explorar sabores
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-cream/40 p-3"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-leaf/20 to-citrus/20">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="absolute inset-0 m-auto h-full w-auto object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-bold leading-tight text-leaf-deep">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-leaf">
                          {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-foreground/50 transition-colors hover:text-destructive"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-border bg-background">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full text-foreground/70 transition-colors hover:text-leaf-deep"
                          aria-label="Disminuir"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-leaf-deep">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full text-foreground/70 transition-colors hover:text-leaf-deep"
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-lg font-black text-leaf-deep">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 bg-cream/40 px-6 py-5">
            {subtotal >= 150 ? (
              <div className="mb-3 rounded-xl bg-leaf/15 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-leaf-deep">
                🎉 ¡Tienes envío GRATIS!
              </div>
            ) : (
              <div className="mb-3 rounded-xl bg-citrus/20 px-3 py-2 text-center text-xs font-semibold text-leaf-deep">
                Agrega ${(150 - subtotal).toFixed(2)} más para envío GRATIS
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-foreground/70">
              <span>Envío</span>
              <span className="font-medium">
                {subtotal >= 150 ? "GRATIS" : "Calculado en checkout"}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display text-lg font-bold text-leaf-deep">
                Total
              </span>
              <span className="font-display text-3xl font-black text-leaf-deep">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf hover:scale-[1.02] active:scale-95"
            >
              Finalizar compra
            </Link>
            <button
              onClick={closeCart}
              className="mt-3 w-full text-center text-xs font-semibold uppercase tracking-widest text-leaf-deep underline-offset-4 hover:underline"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
