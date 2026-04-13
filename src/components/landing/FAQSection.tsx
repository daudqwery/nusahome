import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apakah bisa COD (Bayar di Tempat)?",
    a: "Ya, kami menyediakan opsi COD untuk area tertentu. Silakan hubungi kami via WhatsApp untuk mengecek ketersediaan COD di area Anda.",
  },
  {
    q: "Berapa lama pengiriman?",
    a: "Pengiriman memakan waktu 2-5 hari kerja untuk Pulau Jawa, dan 5-10 hari kerja untuk luar Jawa. Kami menggunakan ekspedisi terpercaya dengan packing yang aman.",
  },
  {
    q: "Apakah ada garansi produk?",
    a: "Tentu! Semua produk NusaHome bergaransi. Kasur bergaransi hingga 5 tahun, sofa dan sofa bed bergaransi 1-2 tahun tergantung produk.",
  },
  {
    q: "Bagaimana jika barang rusak saat pengiriman?",
    a: "Kami akan mengganti barang yang rusak akibat pengiriman secara gratis. Pastikan Anda melakukan video unboxing saat menerima paket sebagai bukti.",
  },
  {
    q: "Apakah bisa retur/tukar produk?",
    a: "Bisa. Retur/tukar dapat dilakukan dalam waktu 7 hari setelah barang diterima, dengan syarat barang dalam kondisi belum digunakan dan masih dalam kemasan asli.",
  },
  {
    q: "Apakah harga sudah termasuk ongkir?",
    a: "Untuk wilayah Jawa, banyak produk kami yang sudah free ongkir. Untuk luar Jawa, ongkir dihitung berdasarkan berat dan lokasi. Hubungi kami untuk info detail.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
          Pertanyaan Umum (FAQ)
        </h2>
        <p className="text-center text-muted-foreground mb-8">Temukan jawaban untuk pertanyaan yang sering diajukan</p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
              <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
