import { Store, Star, Users, Package } from "lucide-react";

const stats = [
  { icon: Package, value: "2258+", label: "Produk Terjual" },
  { icon: Star, value: "4.9/5", label: "Rating Toko (55 ulasan)" },
  { icon: Users, value: "31", label: "Total Produk" },
  { icon: Store, value: "Kab. Tangerang", label: "Lokasi Toko" },
];

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Tentang <span className="text-primary">NusaHome</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            NusaHome adalah toko furnitur online terpercaya yang menyediakan berbagai
            produk sofa, kasur, dan sofa bed berkualitas tinggi dengan harga terjangkau.
            Kami bekerja langsung dengan pabrik untuk memberikan harga terbaik kepada
            pelanggan tanpa mengorbankan kualitas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
