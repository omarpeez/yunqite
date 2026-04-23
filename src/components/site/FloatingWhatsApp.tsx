const WHATSAPP_URL = "https://wa.me/526682502760";

function WhatsAppLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-5 w-5 fill-current"
      focusable="false"
    >
      <path d="M16.04 3.2c-7.04 0-12.76 5.72-12.76 12.75 0 2.25.59 4.45 1.71 6.38L3.17 29l6.84-1.79a12.7 12.7 0 0 0 6.02 1.53h.01c7.03 0 12.75-5.72 12.75-12.76S23.07 3.2 16.04 3.2Zm0 23.38h-.01c-1.91 0-3.79-.51-5.43-1.48l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.55 10.55 0 0 1-1.61-5.61c0-5.87 4.78-10.65 10.66-10.65 2.84 0 5.52 1.11 7.53 3.12a10.58 10.58 0 0 1 3.12 7.55c0 5.88-4.78 10.65-10.64 10.65Zm5.84-7.98c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-leaf-deep text-cream shadow-lg shadow-leaf-deep/20 transition-all hover:-translate-y-0.5 hover:bg-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 md:bottom-6 md:right-6 md:h-13 md:w-auto md:px-4"
    >
      <WhatsAppLogo />
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </a>
  );
}