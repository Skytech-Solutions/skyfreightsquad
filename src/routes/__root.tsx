import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import { BackToTop } from "../components/BackToTop";
import { MobileFloatingCTA } from "../components/MobileFloatingCTA";
import { ExitIntentOverlay } from "../components/ExitIntentOverlay";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page not found</h2>
        <p className="mt-2 text-sm text-muted-gray">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-bold text-white hover:bg-cta-hover transition-colors">
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
      { title: "SkyFreightSquad — 24/7 Freight BPO for Brokers & 3PLs" },
      { name: "description", content: "Dispatch, track & trace, billing, and customer support — fully managed, always on. Built exclusively for freight brokers and 3PL operators." },
      { name: "author", content: "SkyFreightSquad" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkyFreightSquad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyfreightsquad" },
      { property: "og:title", content: "SkyFreightSquad — 24/7 Freight BPO for Brokers & 3PLs" },
      { name: "twitter:title", content: "SkyFreightSquad — 24/7 Freight BPO for Brokers & 3PLs" },
      { property: "og:description", content: "Dispatch, track & trace, billing, and customer support — fully managed, always on. Built exclusively for freight brokers and 3PL operators." },
      { name: "twitter:description", content: "Dispatch, track & trace, billing, and customer support — fully managed, always on. Built exclusively for freight brokers and 3PL operators." },
      { property: "og:image", content: "https://skyfreightsquad.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://skyfreightsquad.com/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/SkyFreightSquad_Logo_Horizontal_LightBG.png", as: "image" },
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
  const location = useLocation();
  const isAdmin = location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <MobileFloatingCTA />
      <ExitIntentOverlay />
    </>
  );
}
