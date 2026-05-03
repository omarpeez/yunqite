import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { TopBanner } from "@/components/site/TopBanner";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { Merch } from "@/components/site/Merch";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { MerchCartDrawer } from "@/components/site/MerchCartDrawer";
import { ScrollMascot } from "@/components/site/ScrollMascot";
import { useReveal } from "@/hooks/use-reveal";
import { useMerchSync } from "@/hooks/use-merch-sync";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  useMerchSync();
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Shop />
      <Merch />
      <Contact />
      <Footer />
      <CartDrawer />
      <MerchCartDrawer />
      <ScrollMascot />
    </main>
  );
}
