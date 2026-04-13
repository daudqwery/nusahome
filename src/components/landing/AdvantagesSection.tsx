import { Truck, ShieldCheck, Factory, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const advantages = [
  {
    icon: CreditCard,
    title: "COD / Bayar di Tempat",
    desc: "Bayar saat barang sampai. Aman & nyaman tanpa risiko.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Kualitas",
    desc: "Garansi resmi hingga 5 tahun untuk setiap produk.",
  },
  {
    icon: Factory,
    title: "Harga Pabrik",
    desc: "Langsung dari produsen, tanpa perantara. Hemat hingga 50%.",
  },
  {
    icon: Truck,
    title: "Kirim Seluruh Indonesia",
    desc: "Pengiriman aman ke seluruh Indonesia, gratis ongkir area tertentu.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          Kenapa Pilih <span className="text-primary">NusaHome</span>?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {advantages.map((item) => (
            <Card key={item.title} className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
