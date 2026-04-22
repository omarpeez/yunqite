import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/526682502760";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-leaf-deep text-cream shadow-lg shadow-leaf-deep/20 transition-all hover:-translate-y-0.5 hover:bg-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 md:bottom-6 md:right-6 md:h-13 md:w-auto md:px-4"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </a>
  );
}