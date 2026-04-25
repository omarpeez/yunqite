import { Instagram, Facebook } from "lucide-react";
import logoYunqi from "@/assets/logo-yunqi.png";

export function Footer() {
  const social = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/yunqite?igsh=MXQ1a2R2ZDFpMjMxeg==" },
    { icon: TikTok, label: "TikTok", href: "https://www.tiktok.com/@yunqite?_r=1&_t=ZS-95nVamUkA40" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1XUcnzeLby/?mibextid=wwXIfr" },
  ];
  return (
    <footer className="bg-leaf-deep text-cream pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <img src={logoYunqi} alt="Yùnqi" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-6 max-w-sm text-cream/60">
              Té premium embotellado. Cosechado con cariño, servido con orgullo.
            </p>
            <div className="mt-8 flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 transition-all hover:bg-citrus hover:text-leaf-deep hover:border-citrus hover:scale-110 active:scale-95"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold">Enlaces</h4>
            <ul className="mt-4 space-y-2 text-cream/70">
              <li><a href="#sabores" className="hover:text-citrus transition-colors">Sabores</a></li>
              <li><a href="#merch" className="hover:text-citrus transition-colors">Merch</a></li>
              <li><a href="#contacto" className="hover:text-citrus transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold">Legal</h4>
            <ul className="mt-4 space-y-2 text-cream/70">
              <li><a href="#" className="hover:text-citrus transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-citrus transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-citrus transition-colors">Envíos</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 md:flex-row">
          <p>© 2026 Verde. Todos los derechos reservados.</p>
          <p>Hecho con hojas reales 🌿</p>
        </div>
      </div>
    </footer>
  );
}

function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.85 4.85 0 0 1-1.84-.21Z" />
    </svg>
  );
}
