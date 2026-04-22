import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { Benefits } from "@/components/site/Benefits";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Shop />
      <Benefits />
      <Contact />
      <Footer />
      <CartDrawer />
    </main>
  );
}
