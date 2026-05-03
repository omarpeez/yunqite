export function TopBanner() {
  const message = "🚚 Envío GRATIS en compras de $150 o más";
  const items = Array.from({ length: 12 });
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-leaf-deep text-cream py-1.5 text-xs font-semibold uppercase tracking-widest">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            {message}
            <span aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
