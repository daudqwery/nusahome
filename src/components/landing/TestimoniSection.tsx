import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rina S.",
    location: "Jakarta",
    rating: 5,
    text: "Sofa bed-nya bagus banget, busa tebal dan nyaman. Anak-anak suka banget. Pengiriman juga cepat!",
  },
  {
    name: "Budi P.",
    location: "Surabaya",
    rating: 5,
    text: "Kasur memory foam-nya luar biasa empuk. Tidur jadi lebih nyenyak. Harga jauh lebih murah dari toko offline.",
  },
  {
    name: "Sari M.",
    location: "Bandung",
    rating: 5,
    text: "Sudah 2x order di NusaHome. Kualitas selalu konsisten bagus. Respon WhatsApp juga cepat dan ramah.",
  },
  {
    name: "Ahmad R.",
    location: "Semarang",
    rating: 4,
    text: "Sofa L-nya kokoh dan elegan. Ruang tamu jadi lebih cantik. Recommended banget!",
  },
  {
    name: "Dewi L.",
    location: "Medan",
    rating: 5,
    text: "Pengiriman ke Medan aman, packing rapi. Sofa bed-nya persis seperti di foto. Sangat puas!",
  },
  {
    name: "Hendra K.",
    location: "Yogyakarta",
    rating: 5,
    text: "Harga pabrik beneran! Kasur spring bed-nya empuk dan tidak bunyi. Worth it banget.",
  },
];

const TestimoniSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
          Apa Kata Pelanggan?
        </h2>
        <p className="text-center text-muted-foreground mb-10">Review jujur dari pelanggan setia NusaHome</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none shadow-md bg-card">
              <CardContent className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${j < t.rating ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;
