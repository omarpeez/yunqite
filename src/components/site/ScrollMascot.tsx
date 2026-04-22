import { useEffect, useMemo, useState } from "react";

const stops = [
  { id: "inicio", phrase: "¡Vamos!", x: 0, y: 0, tilt: -6 },
  { id: "sabores", phrase: "Elige sabor", x: 10, y: -42, tilt: 8 },
  { id: "beneficios", phrase: "Natural", x: -8, y: -84, tilt: -8 },
  { id: "contacto", phrase: "Te acompaño", x: 8, y: -126, tilt: 6 },
] as const;

export function ScrollMascot() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

  const activeStop = stops[activeIndex];
  const hop = Math.sin(progress * Math.PI * 18) * 8;
  const transform = useMemo(
    () => `translate3d(${activeStop.x}px, ${activeStop.y + hop}px, 0) rotate(${activeStop.tilt}deg)`,
    [activeStop, hop]
  );

  return (
    <aside
      className="pointer-events-none fixed bottom-5 left-4 z-40 hidden select-none sm:block"
      aria-label="Mascota demo de Yùnqi acompañando el recorrido"
    >
      <div
        className="relative transition-transform duration-700 ease-out"
        style={{ transform }}
      >
        <div className="absolute -right-24 -top-5 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-leaf-deep shadow-[0_14px_36px_-24px_oklch(0.2_0.05_149.3/0.65)] ring-1 ring-leaf/15 backdrop-blur-md">
          {activeStop.phrase}
        </div>

        <svg
          width="118"
          height="138"
          viewBox="0 0 118 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_24px_30px_oklch(0.2_0.05_149.3/0.22)]"
          role="img"
          aria-label="Mascota hoja de Yùnqi"
        >
          <path
            d="M57.7 13.4C83.5 26.3 101.6 49.2 95.2 78.2C88.8 107.2 63.4 124.9 40.8 113.5C18.2 102.1 11.8 70.2 22.6 45.8C33.5 21.4 31.9.5 57.7 13.4Z"
            className="fill-leaf"
          />
          <path
            d="M58.1 14.8C62.4 49.8 56.1 80.2 36.9 111.3"
            className="stroke-leaf-deep"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M46.6 54.8C40.7 48.2 33.3 45.2 25.4 43.8M56.6 76.3C68.2 73.4 79.3 66.6 91.8 54.1"
            className="stroke-leaf-deep"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle cx="43" cy="66" r="5" className="fill-cream" />
          <circle cx="70" cy="66" r="5" className="fill-cream" />
          <circle cx="44" cy="66" r="2" className="fill-leaf-deep" />
          <circle cx="69" cy="66" r="2" className="fill-leaf-deep" />
          <path
            d="M50.5 82.5C56.3 88.7 64.5 88.4 69.8 82.5"
            className="stroke-cream"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M28.3 109.3C21.6 116.3 15.5 122.6 8.8 129.6M77.8 111.1C84.7 117.2 91.6 123.3 98.5 129.4"
            className="stroke-leaf-deep"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M24.2 94.6C14.8 94.2 9 88.7 6.8 80.2M85.3 90.9C94.5 89 101 83.7 105.3 76.1"
            className="stroke-leaf-deep"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="89" cy="35" r="10" className="fill-citrus" />
          <path
            d="M91.8 29.2C93.2 24.2 96.5 20.7 101.4 18.5"
            className="stroke-leaf-deep"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </aside>
  );
}
