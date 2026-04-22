import { useState } from "react";
import { Plus } from "lucide-react";
import green from "@/assets/bottle-green-lemon.png";
import peach from "@/assets/bottle-peach.png";
import hibiscus from "@/assets/bottle-hibiscus.png";
import oolong from "@/assets/bottle-oolong-real.png";
import { addItem, openCart, type Size } from "@/hooks/use-cart";

const SIZES: Size[] = ["500ml", "1L"];
const PRICE: Record<Size, number> = { "500ml": 4.5, "1L": 7.0 };

const products = [
  { id: "o", name: "Té Oolong", img: oolong, accent: "leaf", note: "Tostado • Equilibrado" },
  { id: "j", name: "Jamaica", img: hibiscus, accent: "berry", note: "Floral • Vibrante" },
  { id: "pi", name: "Piña", img: peach, accent: "peach", note: "Tropical • Jugoso" },
  { id: "lf", name: "Limón-Fresa", img: green, accent: "citrus", note: "Cítrico • Dulce" },
] as const;

export function Shop() {
  return (
    <section id="sabores" className="relative py-32 px-6 bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-20 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf">Nuestra colección</span>
          <h2 className="mt-3 font-display text-5xl md:text-7xl font-black text-leaf-deep">
            Cuatro sabores.<br />
            <span className="italic font-light">Una obsesión:</span> el sabor real.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  delay,
}: {
  product: (typeof products)[number];
  delay: number;
}) {
  const [size, setSize] = useState<Size>("500ml");
  const [added, setAdded] = useState(false);
  const accentBg: Record<string, string> = {
    citrus: "from-citrus/40 to-leaf/20",
    peach: "from-peach/40 to-earth/20",
    berry: "from-berry/30 to-peach/20",
    leaf: "from-leaf/30 to-citrus/20",
  };

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size,
      price: PRICE[size],
      img: product.img,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className="reveal group relative flex flex-col rounded-3xl bg-background p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_oklch(0.34_0.08_150/0.3)]"
      data-delay={`${delay}ms`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br ${accentBg[product.accent]} mb-6`}
      >
        <img
          src={product.img}
          alt={product.name}
          width={1024}
          height={1024}
          loading="lazy"
          className="absolute inset-0 m-auto h-full w-auto object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
        />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-leaf">{product.note}</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-leaf-deep">{product.name}</h3>

      <div className="mt-4 flex gap-2">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`flex-1 rounded-full border py-2 text-xs font-semibold transition-all ${
              size === s
                ? "border-leaf-deep bg-leaf-deep text-cream"
                : "border-border bg-transparent text-foreground/70 hover:border-leaf"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-display text-3xl font-black text-leaf-deep">
          ${PRICE[size].toFixed(2)}
        </span>
        <button
          onClick={handleAdd}
          className={`grid h-12 w-12 place-items-center rounded-full transition-all active:scale-90 ${
            added ? "bg-leaf scale-110" : "bg-leaf-deep hover:bg-leaf hover:scale-110"
          } text-cream`}
          aria-label="Añadir al carrito"
        >
          <Plus className={`h-5 w-5 transition-transform ${added ? "rotate-45" : ""}`} />
        </button>
      </div>
    </article>
  );
}
