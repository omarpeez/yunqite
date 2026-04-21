import { Sprout, Droplet, Recycle } from "lucide-react";

const items = [
  { icon: Sprout, title: "100% Natural", desc: "Hojas seleccionadas a mano. Sin conservantes ni colorantes artificiales." },
  { icon: Droplet, title: "Sin Azúcar Añadida", desc: "Endulzado solo con frutas reales. Toda la frescura, ninguna culpa." },
  { icon: Recycle, title: "Envases Eco-friendly", desc: "Vidrio reciclable y etiquetas de papel compostable. Por el planeta." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="relative py-32 px-6 bg-leaf-deep text-cream overflow-hidden">
      <div className="absolute inset-0 -z-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,oklch(0.62_0.14_145),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.88_0.16_95),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal mb-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-citrus">Por qué Verde</span>
          <h2 className="mt-3 font-display text-5xl md:text-6xl font-black">
            Hecho con <span className="italic font-light">intención.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal group rounded-3xl border border-cream/10 bg-cream/5 p-10 backdrop-blur-sm transition-all hover:bg-cream/10 hover:-translate-y-2"
              data-delay={`${i * 150}ms`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-citrus text-leaf-deep transition-transform group-hover:rotate-6 group-hover:scale-110">
                <it.icon className="h-8 w-8" strokeWidth={2.2} />
              </div>
              <h3 className="mt-8 font-display text-3xl font-bold">{it.title}</h3>
              <p className="mt-4 text-cream/70 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
