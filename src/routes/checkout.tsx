import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Lock, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useCart, clearCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Verde" },
      {
        name: "description",
        content:
          "Finaliza tu compra de té premium embotellado. Pago seguro y envío rápido.",
      },
      { property: "og:title", content: "Checkout — Verde" },
      {
        property: "og:description",
        content:
          "Finaliza tu compra de té premium embotellado. Pago seguro y envío rápido.",
      },
    ],
  }),
  component: CheckoutPage,
});

type Step = "info" | "shipping" | "payment" | "success";

function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("info");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard",
  );
  const shipping = subtotal === 0 ? 0 : shippingMethod === "express" ? 9.9 : 4.9;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const goNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") {
      setStep("success");
      setTimeout(() => clearCart(), 300);
    }
  };

  if (items.length === 0 && step !== "success") {
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
            Agrega algunos sabores antes de finalizar tu compra.
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

  if (step === "success") {
    return (
      <main className="bg-background text-foreground">
        <Header />
        <CartDrawer />
        <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-leaf/30" />
            <div className="grid h-28 w-28 place-items-center rounded-full bg-leaf-deep text-cream">
              <Check className="h-14 w-14" strokeWidth={3} />
            </div>
          </div>
          <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-leaf/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-leaf-deep">
            Pedido confirmado
          </span>
          <h1 className="mt-6 font-display text-6xl font-black text-leaf-deep">
            ¡Gracias!
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Hemos recibido tu pedido. Te enviamos una confirmación por correo y
            pronto recibirás tu té premium en la puerta de tu casa.
          </p>
          <div className="mt-8 rounded-2xl border border-border/60 bg-cream/40 px-8 py-4 text-sm">
            <span className="text-muted-foreground">Número de pedido: </span>
            <span className="font-display font-bold text-leaf-deep">
              #VRD-{Math.floor(Math.random() * 90000) + 10000}
            </span>
          </div>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf"
          >
            Volver al inicio
          </button>
        </section>
      </main>
    );
  }

  const stepIdx = step === "info" ? 0 : step === "shipping" ? 1 : 2;
  const stepLabels = ["Información", "Envío", "Pago"];

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
          Finaliza tu<br />
          <span className="italic font-light">pedido.</span>
        </h1>

        {/* Stepper */}
        <div className="mt-10 flex items-center gap-4">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                  i <= stepIdx
                    ? "bg-leaf-deep text-cream"
                    : "bg-muted text-foreground/40"
                }`}
              >
                {i < stepIdx ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-widest ${
                  i <= stepIdx ? "text-leaf-deep" : "text-foreground/40"
                }`}
              >
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <span
                  className={`h-px w-8 transition-colors ${
                    i < stepIdx ? "bg-leaf-deep" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          <form onSubmit={goNext} className="space-y-8">
            {step === "info" && (
              <div className="rounded-3xl border border-border/60 bg-background p-8">
                <h2 className="font-display text-2xl font-bold text-leaf-deep">
                  Información de contacto
                </h2>
                <div className="mt-6 space-y-4">
                  <Field label="Email" required value={form.email} onChange={update("email")} type="email" placeholder="tu@email.com" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Nombre" required value={form.firstName} onChange={update("firstName")} />
                    <Field label="Apellido" required value={form.lastName} onChange={update("lastName")} />
                  </div>
                  <Field label="Teléfono" required value={form.phone} onChange={update("phone")} type="tel" placeholder="+52 555 000 0000" />
                </div>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-border/60 bg-background p-8">
                  <h2 className="font-display text-2xl font-bold text-leaf-deep">
                    Dirección de envío
                  </h2>
                  <div className="mt-6 space-y-4">
                    <Field label="Dirección" required value={form.address} onChange={update("address")} placeholder="Calle, número, colonia" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Ciudad" required value={form.city} onChange={update("city")} />
                      <Field label="Código postal" required value={form.zip} onChange={update("zip")} />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-border/60 bg-background p-8">
                  <h2 className="font-display text-2xl font-bold text-leaf-deep">
                    Método de envío
                  </h2>
                  <div className="mt-6 space-y-3">
                    <ShippingOption
                      selected={shippingMethod === "standard"}
                      onClick={() => setShippingMethod("standard")}
                      title="Envío estándar"
                      desc="3 a 5 días hábiles"
                      price={4.9}
                    />
                    <ShippingOption
                      selected={shippingMethod === "express"}
                      onClick={() => setShippingMethod("express")}
                      title="Envío exprés"
                      desc="24 a 48 horas"
                      price={9.9}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="rounded-3xl border border-border/60 bg-background p-8">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold text-leaf-deep">
                    Método de pago
                  </h2>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" /> Pago 100% seguro
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  <Field label="Nombre en la tarjeta" required value={form.cardName} onChange={update("cardName")} />
                  <Field label="Número de tarjeta" required value={form.cardNumber} onChange={update("cardNumber")} placeholder="4242 4242 4242 4242" inputMode="numeric" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Vencimiento" required value={form.cardExp} onChange={update("cardExp")} placeholder="MM / AA" />
                    <Field label="CVC" required value={form.cardCvc} onChange={update("cardCvc")} placeholder="123" inputMode="numeric" />
                  </div>
                </div>
                <p className="mt-6 text-xs text-muted-foreground">
                  Esta es una demo — no se procesará ningún cargo real.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              {step !== "info" ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep(step === "payment" ? "shipping" : "info")
                  }
                  className="text-sm font-semibold uppercase tracking-wider text-leaf-deep underline-offset-8 hover:underline"
                >
                  ← Atrás
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf hover:scale-105 active:scale-95"
              >
                {step === "payment" ? `Pagar $${total.toFixed(2)}` : "Continuar"}
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
                {count} {count === 1 ? "producto" : "productos"}
              </p>

              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-leaf/20 to-citrus/20">
                      <img src={item.img} alt={item.name} className="absolute inset-0 m-auto h-full w-auto object-contain p-1" />
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

              <div className="mt-6 space-y-2 border-t border-border/60 pt-6 text-sm">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Envío</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Impuestos (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-border/60 pt-4">
                <span className="font-display text-lg font-bold text-leaf-deep">
                  Total
                </span>
                <span className="font-display text-3xl font-black text-leaf-deep">
                  ${total.toFixed(2)}
                </span>
              </div>
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

function ShippingOption({
  selected,
  onClick,
  title,
  desc,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  price: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-leaf-deep bg-leaf/5"
          : "border-border bg-background hover:border-leaf"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
            selected ? "border-leaf-deep bg-leaf-deep" : "border-border"
          }`}
        >
          {selected && <div className="h-2 w-2 rounded-full bg-cream" />}
        </div>
        <div>
          <p className="font-semibold text-leaf-deep">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <span className="font-display text-lg font-black text-leaf-deep">
        ${price.toFixed(2)}
      </span>
    </button>
  );
}
