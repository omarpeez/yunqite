import { useEffect, useMemo, useState } from "react";
import bottle from "@/assets/mascot-yunqi.png";

const stops = [
  { id: "inicio", x: 0, y: 0, tilt: -6 },
  { id: "sabores", x: 10, y: -42, tilt: 8 },
  { id: "beneficios", x: -8, y: -84, tilt: -8 },
  { id: "contacto", x: 8, y: -126, tilt: 6 },
] as const;

const phrases = ["Sigue fluyendo", "Respira y avanza", "Hoy sabe a ti"] as const;

export function ScrollMascot() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(window.scrollY / maxScroll);

      const viewportAnchor = window.innerHeight * 0.42;
      const nextIndex = stops.reduce((closest, stop, index) => {
        const element = document.getElementById(stop.id);
        if (!element) return closest;

        const distance = Math.abs(element.getBoundingClientRect().top - viewportAnchor);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

      setActiveIndex(nextIndex);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex((current) => {
        let next = Math.floor(Math.random() * phrases.length);
        if (next === current) next = (next + 1) % phrases.length;
        return next;
      });
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const activeStop = stops[activeIndex];
  const hop = Math.sin(progress * Math.PI * 18) * 8;
  const transform = useMemo(
    () => `translate3d(${activeStop.x}px, ${activeStop.y + hop}px, 0) rotate(${activeStop.tilt}deg)`,
    [activeStop, hop]
  );

  return (
    <aside
      className="pointer-events-none fixed bottom-3 left-3 z-[60] block origin-bottom-left scale-75 select-none sm:bottom-5 sm:left-4 sm:scale-100"
      aria-label="Mascota demo de Yùnqi acompañando el recorrido"
    >
      <div
        className="relative h-36 w-28 transition-transform duration-700 ease-out sm:h-44 sm:w-36"
        style={{ transform }}
      >
        <div className="absolute left-14 top-3 z-10 w-36 rotate-3 rounded-md bg-cream px-3 py-2 text-center text-[10px] font-black uppercase leading-tight tracking-wider text-leaf-deep shadow-[0_14px_36px_-24px_oklch(0.2_0.05_149.3/0.65)] ring-2 ring-leaf-deep/80 transition-all duration-500 sm:left-20 sm:top-1 sm:w-40 sm:text-xs">
          <span className="absolute -bottom-4 left-5 h-4 w-1.5 rotate-6 bg-leaf-deep" aria-hidden />
          <span className="absolute -bottom-4 right-5 h-4 w-1.5 -rotate-6 bg-leaf-deep" aria-hidden />
          {phrases[phraseIndex]}
        </div>

        <img
          src={bottle}
          alt="Botella Oolong animada como mascota de Yùnqi"
          className="relative h-full w-auto animate-float-bottle object-contain drop-shadow-[0_24px_30px_oklch(0.2_0.05_149.3/0.22)]"
        />
      </div>
    </aside>
  );
}
