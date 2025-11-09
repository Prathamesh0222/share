import { Benefits } from "@/components/benefits";
import { Features } from "@/components/features";
import { CTAFooter } from "@/components/cta-footer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <CTAFooter />
      <Footer />
    </div>
  );
}
