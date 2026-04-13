import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/data/products";
import { MessageCircle, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30">
          <span className="text-sm font-medium text-accent-foreground">🏠 Toko Furnitur Terpercaya</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Nyaman di Rumah,
          <br />
          <span className="text-primary">Mulai dari NusaHome</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Sofa, kasur & sofa bed berkualitas dengan harga pabrik langsung.
          Gratis ongkir, bisa COD, garansi resmi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base px-8 py-6 rounded-full shadow-lg" asChild>
            <a href="#katalog">
              Lihat Katalog
              <ChevronDown className="ml-1 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full border-2 border-primary/30 hover:bg-primary/5" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-5 w-5" />
              Hubungi via WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-center">
          {[
            { value: "5000+", label: "Produk Terjual" },
            { value: "4.9★", label: "Rating Toko" },
            { value: "100%", label: "Original" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
