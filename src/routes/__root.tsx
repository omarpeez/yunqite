import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Verde — Té Premium Embotellado" },
      { name: "description", content: "Té premium embotellado, 100% natural, sin azúcar añadida. Frescura en cada sorbo." },
      { name: "author", content: "Verde" },
      { property: "og:title", content: "Verde — Té Premium Embotellado" },
      { property: "og:description", content: "Té premium embotellado, 100% natural, sin azúcar añadida. Frescura en cada sorbo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Verde — Té Premium Embotellado" },
      { name: "twitter:description", content: "Té premium embotellado, 100% natural, sin azúcar añadida. Frescura en cada sorbo." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e94ae679-3003-410e-91b1-ae9e6a4f7045/id-preview-a6e2b831--5ae665f0-7df6-46e8-81f9-0866897cdb60.lovable.app-1776742369544.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e94ae679-3003-410e-91b1-ae9e6a4f7045/id-preview-a6e2b831--5ae665f0-7df6-46e8-81f9-0866897cdb60.lovable.app-1776742369544.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <FloatingWhatsApp />
    </>
  );
}
