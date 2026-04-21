import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { Benefits } from "@/components/site/Benefits";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [cart, setCart] = useState(0);
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Header cartCount={cart} />
      <Hero />
      <Shop onAdd={() => setCart((c) => c + 1)} />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}
