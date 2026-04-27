import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, openCart } from "@/hooks/use-cart";
import logoYunqi from "@/assets/logo-yunqi.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string) => (
    <a
      href={href}
      className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-leaf-deep
        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-right after:scale-x-0
        after:bg-leaf after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
    >
      {label}
    </a>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          aria-label="Yùnqi inicio"
        >
          <img
            src={logoYunqi}
            alt="Yùnqi"
            className="h-9 md:h-10 w-auto transition-transform group-hover:scale-105"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {link("/#inicio", "Inicio")}
          {link("/#sabores", "Sabores")}
          {link("/#merch", "Merch")}
          {link("/#contacto", "Conversemos")}
        </nav>
        <button
          onClick={openCart}
          className="relative grid place-items-center h-11 w-11 rounded-full bg-leaf-deep text-cream
            transition-all hover:scale-110 hover:bg-leaf active:scale-95"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-citrus text-[11px] font-bold text-leaf-deep animate-in zoom-in">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
