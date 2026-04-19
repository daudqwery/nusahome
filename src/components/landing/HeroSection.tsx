import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/data/products";
import { MessageCircle, ChevronDown, PlayCircle } from "lucide-react";

// Ganti dengan ID video YouTube Anda (bagian setelah v=)
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Layered warm professional background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.35),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_hsl(var(--accent)/0.28),_transparent_55%),linear-gradient(135deg,_hsl(30_45%_12%)_0%,_hsl(25_35%_18%)_50%,_hsl(20_30%_10%)_100%)]" />
      {/* Subtle noise / grain texture via SVG */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Soft glow accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/25 rounded-full blur-3xl" />
      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">🏠 Toko Furnitur Terpercaya</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight drop-shadow-lg">
              Nyaman di Rumah,
              <br />
              <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
                Mulai dari NusaHome
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/85 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Sofa, kasur & sofa bed berkualitas dengan harga pabrik langsung.
              Gratis ongkir, bisa COD, garansi resmi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" className="text-base px-8 py-6 rounded-full shadow-xl shadow-primary/30" asChild>
                <a href="#katalog">
                  Lihat Katalog
                  <ChevronDown className="ml-1 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full border-2 border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-sm"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1 h-5 w-5" />
                  Hubungi via WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-10 flex justify-center lg:justify-start gap-8 text-center lg:text-left">
              {[
                { value: "5000+", label: "Produk Terjual" },
                { value: "4.9★", label: "Rating Toko" },
                { value: "100%", label: "Original" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: YouTube video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/40 aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Video NusaHome"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-white/70 text-sm">
              <PlayCircle className="h-4 w-4" />
              <span>Tonton produk unggulan kami</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
