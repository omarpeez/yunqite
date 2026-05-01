import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, Gift, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, openCart } from "@/hooks/use-cart";
import logoYunqi from "@/assets/logo-yunqi.png";
import { GiftModal } from "./GiftModal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count } = useCart();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

  const mobileLink = (href: string, label: string) => (
    <a
      href={href}
      onClick={() => setMobileOpen(false)}
      className="block py-3 text-2xl font-display text-foreground hover:text-leaf-deep transition-colors border-b border-border/40"
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
          <button
            type="button"
            onClick={() => setGiftOpen(true)}
            className="relative inline-flex items-center justify-center text-foreground/80 transition-colors hover:text-leaf-deep"
            aria-label="Sorpresas y regalos"
          >
            <Gift className="h-5 w-5" />
            <span className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full bg-berry ring-2 ring-background pulse-soft" />
          </button>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGiftOpen(true)}
            className="md:hidden relative inline-flex items-center justify-center h-11 w-11 text-foreground/80 transition-colors hover:text-leaf-deep"
            aria-label="Sorpresas y regalos"
          >
            <Gift className="h-5 w-5" />
            <span className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full bg-berry ring-2 ring-background pulse-soft" />
          </button>
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
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden grid place-items-center h-11 w-11 rounded-full border border-border/60 text-foreground hover:bg-muted transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mounted && createPortal(
        <div
          className={`md:hidden fixed inset-0 z-[80] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background shadow-2xl p-6 flex flex-col transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <img src={logoYunqi} alt="Yùnqi" className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid place-items-center h-10 w-10 rounded-full border border-border/60 text-foreground hover:bg-muted transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              {mobileLink("/#inicio", "Inicio")}
              {mobileLink("/#sabores", "Sabores")}
              {mobileLink("/#merch", "Merch")}
              {mobileLink("/#contacto", "Conversemos")}
            </nav>
          </div>
        </div>,
        document.body,
      )}

      <GiftModal open={giftOpen} onClose={() => setGiftOpen(false)} />
    </header>
  );
}
