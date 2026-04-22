import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import bottle from "@/assets/bottle-yunqi-oolong.png";
import leaf from "@/assets/leaf.png";

export function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* parallax leaves */}
      <img
        src={leaf}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-10 top-32 w-40 opacity-30 animate-drift"
        style={{ transform: `translateY(${y * 0.2}px) rotate(-25deg)` }}
      />
      <img
        src={leaf}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-10 top-1/2 w-56 opacity-20 animate-drift"
        style={{ transform: `translateY(${y * -0.15}px) rotate(40deg)`, animationDelay: "2s" }}
      />
      <img
        src={leaf}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/3 bottom-10 w-32 opacity-25 animate-drift"
        style={{ transform: `translateY(${y * 0.3}px) rotate(120deg)`, animationDelay: "4s" }}
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,oklch(0.93_0.08_140/0.6),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.88_0.16_95/0.4),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-leaf/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-leaf-deep">
            <Sparkles className="h-3.5 w-3.5" /> Cosecha 2026
          </span>
          <h1 className="mt-6 font-display text-6xl md:text-8xl font-black leading-[0.9] text-leaf-deep">
            Nada sabe<br />
            <span className="italic font-light">mejor que</span><br />
            <span className="text-leaf">ser tú.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">
            Té orgánico premium, infusionado en frío y endulzado solo con la naturaleza.
            Sin azúcar añadida. Sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#sabores"
              className="group inline-flex items-center gap-2 rounded-full bg-leaf-deep px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-leaf hover:scale-105 active:scale-95 pulse-soft"
            >
              Comprar ahora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#beneficios"
              className="text-sm font-semibold uppercase tracking-wider text-leaf-deep underline-offset-8 hover:underline"
            >
              Conoce más →
            </a>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[640px] flex items-center justify-center">
          <div className="absolute inset-0 m-auto h-80 w-80 md:h-96 md:w-96 rounded-full bg-gradient-to-br from-citrus/60 to-leaf/40 blur-3xl" />
          <img
            src={bottle}
            alt="Botella de té premium Verde"
            width={1024}
            height={1024}
            className="relative h-full w-auto object-contain animate-float-bottle drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 40px 60px oklch(0.34 0.08 150 / 0.35))" }}
          />
        </div>
      </div>
    </section>
  );
}
