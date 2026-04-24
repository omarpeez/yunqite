import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Confirmar pedido — Yùnqi" },
      {
        name: "description",
        content:
          "Confirma tu pedido de té premium embotellado y continúa por WhatsApp.",
      },
      { property: "og:title", content: "Confirmar pedido — Yùnqi" },
      {
        property: "og:description",
        content:
          "Confirma tu pedido de té premium embotellado y continúa por WhatsApp.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const update =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
    });
    navigate({ to: "/whatsapp", search: Object.fromEntries(params) as never });
  };

  if (items.length === 0) {
    return (
      <main className="bg-background text-foreground">
        <Header />
        <CartDrawer />
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-leaf/10 text-leaf-deep">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h1 className="mt-8 font-display text-5xl font-black text-leaf-deep">
            Tu carrito está vacío
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Agrega algunos sabores antes de continuar tu pedido.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <Header />
      <CartDrawer />
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-leaf-deep hover:text-leaf"
        >
          <ArrowLeft className="h-4 w-4" /> Seguir comprando
        </Link>
        <h1 className="mt-4 font-display text-5xl md:text-6xl font-black leading-[0.95] text-leaf-deep">
          Confirma tu<br />
          <span className="italic font-light">pedido.</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Revisa tus piezas y completa tus datos. Continuarás tu compra por
          WhatsApp con un mensaje listo para enviar.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="rounded-3xl border border-border/60 bg-background p-8">
              <h2 className="font-display text-2xl font-bold text-leaf-deep">
                Tus datos
              </h2>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Nombre"
                    required
                    value={form.firstName}
                    onChange={update("firstName")}
                    maxLength={60}
                  />
                  <Field
                    label="Apellido"
                    required
                    value={form.lastName}
                    onChange={update("lastName")}
                    maxLength={60}
                  />
                </div>
                <Field
                  label="Dirección"
                  required
                  value={form.address}
                  onChange={update("address")}
                  placeholder="Calle, número, colonia, ciudad, CP"
                  maxLength={200}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf hover:scale-105 active:scale-95"
              >
                Continuar
              </button>
            </div>
          </form>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-cream p-8">
              <h2 className="font-display text-2xl font-bold text-leaf-deep">
                Resumen
              </h2>
              <p className="mt-1 text-xs uppercase tracking-widest text-leaf">
                {count} {count === 1 ? "pieza" : "piezas"}
              </p>

              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-leaf/20 to-citrus/20">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="absolute inset-0 m-auto h-full w-auto object-contain p-1"
                      />
                      <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-leaf-deep text-[10px] font-bold text-cream">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-leaf-deep">
                        {item.name}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {item.size}
                      </span>
                    </div>
                    <span className="font-display font-bold text-leaf-deep">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-baseline justify-between border-t border-border/60 pt-6">
                <span className="font-display text-lg font-bold text-leaf-deep">
                  Total
                </span>
                <span className="font-display text-3xl font-black text-leaf-deep">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Envío y método de pago se acuerdan por WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-leaf-deep">
        {label} {required && <span className="text-berry">*</span>}
      </span>
      <input
        {...props}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-foreground/40 focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
      />
    </label>
  );
}
