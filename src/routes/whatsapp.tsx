import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useCart, clearCart } from "@/hooks/use-cart";

const WHATSAPP_NUMBER = "526682502760";

type WhatsAppSearch = {
  firstName?: string;
  lastName?: string;
  address?: string;
};

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Continúa por WhatsApp — Yùnqi" },
      {
        name: "description",
        content:
          "Envía tu pedido directamente por WhatsApp con un mensaje preestablecido.",
      },
      { property: "og:title", content: "Continúa por WhatsApp — Yùnqi" },
      {
        property: "og:description",
        content:
          "Envía tu pedido directamente por WhatsApp con un mensaje preestablecido.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): WhatsAppSearch => ({
    firstName:
      typeof search.firstName === "string"
        ? search.firstName.slice(0, 60)
        : undefined,
    lastName:
      typeof search.lastName === "string"
        ? search.lastName.slice(0, 60)
        : undefined,
    address:
      typeof search.address === "string"
        ? search.address.slice(0, 200)
        : undefined,
  }),
  component: WhatsAppPage,
});

function WhatsAppLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={`${className} fill-current`}
      focusable="false"
    >
      <path d="M16.04 3.2c-7.04 0-12.76 5.72-12.76 12.75 0 2.25.59 4.45 1.71 6.38L3.17 29l6.84-1.79a12.7 12.7 0 0 0 6.02 1.53h.01c7.03 0 12.75-5.72 12.75-12.76S23.07 3.2 16.04 3.2Zm0 23.38h-.01c-1.91 0-3.79-.51-5.43-1.48l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.55 10.55 0 0 1-1.61-5.61c0-5.87 4.78-10.65 10.66-10.65 2.84 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.12 7.55c0 5.88-4.78 10.65-10.64 10.65Zm5.84-7.98c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function WhatsAppPage() {
  const { firstName = "", lastName = "", address = "" } = Route.useSearch();
  const { items, subtotal, count } = useCart();

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
            Agrega algunos sabores antes de continuar.
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

  const fullName = `${firstName} ${lastName}`.trim();
  const lines = [
    "¡Hola Yùnqi! Quiero realizar el siguiente pedido:",
    "",
    "*Productos:*",
    ...items.map(
      (i) =>
        `• ${i.qty} × ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`,
    ),
    "",
    `*Total:* $${subtotal.toFixed(2)}`,
    "",
    "*Datos de envío:*",
    `Nombre: ${fullName || "—"}`,
    `Dirección: ${address || "—"}`,
    "",
    "¿Me pueden confirmar disponibilidad y método de pago? ¡Gracias!",
  ];
  const message = lines.join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <main className="bg-background text-foreground">
      <Header />
      <CartDrawer />
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-leaf-deep hover:text-leaf"
        >
          <ArrowLeft className="h-4 w-4" /> Editar datos
        </Link>

        <h1 className="mt-4 font-display text-5xl md:text-6xl font-black leading-[0.95] text-leaf-deep">
          Último paso<br />
          <span className="italic font-light">por WhatsApp.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Tu mensaje ya está listo con tu pedido y datos. Solo presiona el
          botón, revisa y envía.
        </p>

        <div className="mt-10 rounded-3xl border border-border/60 bg-cream/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-leaf">
            Vista previa del mensaje
          </p>
          <pre className="mt-4 whitespace-pre-wrap break-words rounded-2xl bg-background p-5 font-sans text-sm leading-relaxed text-foreground/80">
            {message}
          </pre>
          <p className="mt-3 text-xs text-muted-foreground">
            {count} {count === 1 ? "pieza" : "piezas"} · Total $
            {subtotal.toFixed(2)}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => clearCart(), 500)}
          className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-6 text-base md:text-lg font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-[1.02] hover:bg-[#1ebe57] active:scale-95"
        >
          <WhatsAppLogo className="h-7 w-7" />
          Continúa tu compra mediante WhatsApp
        </a>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Se abrirá WhatsApp con tu mensaje listo. Solo presiona enviar.
        </p>
      </section>
    </main>
  );
}
