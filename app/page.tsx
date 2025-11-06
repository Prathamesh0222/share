import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
