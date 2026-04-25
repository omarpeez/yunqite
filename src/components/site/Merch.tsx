import { useEffect, useState } from "react";
import { Loader2, Plus, ShoppingBag } from "lucide-react";
import {
  storefrontApiRequest,
  STOREFRONT_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useMerchCart } from "@/stores/merchCart";

export function Merch() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
        if (!active) return;
        const edges = data?.data?.products?.edges ?? [];
        setProducts(edges);
      } catch (e) {
        console.error("Error fetching merch:", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="merch"
      className="relative py-32 px-6 bg-leaf-deep text-cream overflow-hidden"
    >
      <div className="absolute inset-0 -z-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,oklch(0.62_0.14_145),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.88_0.16_95),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.85_0.12_149.3)]">
            Yunqi Merch
          </span>
          <h2 className="mt-3 font-display text-5xl md:text-6xl font-black">
            Souvenirs <span className="italic font-light">de la marca.</span>
          </h2>
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">
            Lleva contigo un pedacito de Yunqi. Productos exclusivos para los amantes del té.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-citrus" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-cream/10 bg-cream/5">
            <ShoppingBag className="h-12 w-12 mx-auto text-cream/40 mb-4" />
            <p className="text-cream/70">No hay productos disponibles aún.</p>
            <p className="text-cream/50 text-sm mt-2">
              Pronto agregaremos souvenirs increíbles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <MerchCard key={p.node.id} product={p} delay={i * 100} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MerchCard({ product, delay }: { product: ShopifyProduct; delay: number }) {
  const variants = product.node.variants.edges;
  const [variantId, setVariantId] = useState(variants[0]?.node.id ?? "");
  const addItem = useMerchCart((s) => s.addItem);
  const isLoading = useMerchCart((s) => s.isLoading);

  const variant = variants.find((v) => v.node.id === variantId)?.node ?? variants[0]?.node;
  const image = product.node.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <article
      className="reveal group relative flex flex-col rounded-3xl bg-cream/5 border border-cream/10 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-cream/10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-citrus/30 to-leaf/20 mb-6">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <ShoppingBag className="h-12 w-12 text-cream/40" />
          </div>
        )}
      </div>

      <h3 className="font-display text-2xl font-bold text-cream">{product.node.title}</h3>
      {product.node.description && (
        <p className="mt-2 text-sm text-cream/60 line-clamp-2">{product.node.description}</p>
      )}

      {variants.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.node.id}
              onClick={() => setVariantId(v.node.id)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                variantId === v.node.id
                  ? "border-citrus bg-citrus text-leaf-deep"
                  : "border-cream/20 text-cream/70 hover:border-citrus"
              }`}
            >
              {v.node.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="font-display text-3xl font-black text-citrus">
          {variant?.price.currencyCode} {parseFloat(variant?.price.amount ?? "0").toFixed(2)}
        </span>
        <button
          onClick={handleAdd}
          disabled={isLoading || !variant?.availableForSale}
          className="grid h-12 w-12 place-items-center rounded-full bg-citrus text-leaf-deep transition-all hover:scale-110 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Añadir al carrito"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
        </button>
      </div>
    </article>
  );
}
