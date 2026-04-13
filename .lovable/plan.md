

# Landing Page NusaHome Sofa & Kasur

Landing page lengkap untuk toko **NusaHome** yang menjual sofa, kasur, dan sofa bed. Desain modern, mobile-first (viewport 394px), dengan nuansa warm/cozy untuk furnitur rumah.

## Struktur Halaman

1. **Hero Section** -- Banner utama dengan tagline "Nyaman di Rumah, Mulai dari NusaHome", background gradient warm, CTA tombol WhatsApp & lihat katalog
2. **Keunggulan Toko** -- 4 icon cards: COD/Bayar di Tempat, Garansi Kualitas, Harga Pabrik, Pengiriman Seluruh Indonesia
3. **Katalog Produk** -- 3 kategori tab (Sofa, Kasur, Sofa Bed) dengan card produk berisi gambar placeholder, nama, harga, badge diskon, tombol WhatsApp order
4. **Tentang NusaHome** -- Deskripsi singkat toko, statistik (produk terjual, rating, dll)
5. **Testimoni** -- Carousel review pelanggan
6. **FAQ** -- Accordion pertanyaan umum (pengiriman, garansi, retur)
7. **Footer** -- Link toko di TikTok Shop & Tokopedia, kontak WhatsApp, alamat

## Detail Teknis

- **Files**: `src/pages/Index.tsx` (main page), komponen terpisah per section di `src/components/landing/`
- **Styling**: Tailwind CSS, custom CSS variables warm palette (cokelat/krem/emas)
- **Components used**: Card, Button, Tabs, Accordion, Carousel dari shadcn/ui
- **WhatsApp CTA**: Floating button + inline buttons, link ke `wa.me/` 
- **Responsive**: Mobile-first, grid 1 col mobile -> 2-3 col desktop
- **Data produk**: Array statis di file terpisah `src/data/products.ts` dengan produk-produk NusaHome (sofa, kasur memory foam, sofa bed lipat)

## Warna

- Primary: warm brown/cokelat
- Accent: emas/gold
- Background: krem hangat
- Text: dark brown

