export interface Product {
  id: string;
  name: string;
  category: "sofa" | "kasur" | "sofa-bed" | "aksesoris";
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
  sold?: string;
  rating?: number;
}

export const products: Product[] = [
  // === SOFA BED ===
  {
    id: "1",
    name: "Sofa Bed Minimalis Ruang Tamu Serbaguna",
    category: "sofa-bed",
    price: 1945000,
    originalPrice: 2945000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/86812ad623d6493890063379733d6218~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088643&x-signature=11lTyuQGPMzTLcBlkQes0UbhClE%3D&x-signature-webp=HZidfhnLtRG7pTx2ZebVdtb4jwY%3D",
    badge: "Best Seller",
    description: "Nyaman empuk, bahan vacuum anti bau, rangka kuat & sandaran bisa dilepas. Tersedia warna Abu-Abu, Oranye, Hijau, Putih. Ukuran 90CM - 180CM.",
    sold: "500+",
    rating: 4.7,
  },
  {
    id: "2",
    name: "Sofabed Lipat Aesthetic Modern Multifungsi",
    category: "sofa-bed",
    price: 2500000,
    originalPrice: 9500000,
    image: "https://p19-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/60cdbb9576da4c1b8e4060e4e52e8f45~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088653&x-signature=6q%2BdkJB2MUTJlVxcztDh70MydbE%3D&x-signature-webp=D6SgMtiPU2%2F1ziBevFZHC%2B%2F2EDo%3D",
    badge: "Diskon 74%",
    description: "Corduroy velvet, double folding, cocok untuk ruang kecil dan pertemuan keluarga. Bahan lembut dan nyaman. Tersedia 6 warna.",
  },
  {
    id: "3",
    name: "Sofa Bed 3 in 1 Bisa Jadi Kasur Tidur",
    category: "sofa-bed",
    price: 1945000,
    originalPrice: 2945000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/b9acf4e889f144e89ac8569912c33c41~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088661&x-signature=kJYTzYDr4N%2BQW0I%2BD%2FZ4OcWapu8%3D&x-signature-webp=XISByORUMXe84dQiOptoDBijvT4%3D",
    badge: "Diskon 34%",
    description: "Modern simple desain elegan, mudah dibuka. Tersedia 4 warna & 4 ukuran. Rating 5.0, 100+ terjual.",
    sold: "100+",
    rating: 5.0,
  },

  // === SOFA BEANBAG ===
  {
    id: "4",
    name: "Sofa Beanbag 2026 Nyaman Empuk Lembut",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/0691c1e5e12e44599094cda337d5e1f0~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088669&x-signature=JMPM%2B3r5bHoh1ETa9eTAF1ES%2Br8%3D&x-signature-webp=RMpNpKwBUKR7TaEAez7JvNLPuf4%3D",
    badge: "Diskon 77%",
    description: "Kain keriting tahan noda & aus, dapat dicuci. Tersedia 7 warna. Ukuran 70x90x70cm.",
    sold: "18",
    rating: 5.0,
  },
  {
    id: "5",
    name: "Sofa Malas Minimalis Lipat Tanpa Kaki",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/f547afe738af48ff9ea88f8f349151a8~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088693&x-signature=FQiOvrZqeoRKIT4OjTFftlaUTSY%3D&x-signature-webp=w1qsurZb61kDkbbF%2FCn4u0s2ce8%3D",
    badge: "Diskon 77%",
    description: "Sofa mini rumah kecil, bisa dibongkar cuci. Tersedia 7 warna.",
  },
  {
    id: "6",
    name: "Sofa Beanbag Kepadatan Kain Nyaman Mewah",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/80c87dd876e34aebad406b682808e533~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088706&x-signature=mqdRaX%2BKQZZ9Esf9nJPYn1LagjI%3D&x-signature-webp=xA0rVOLSfy5KRrv9Jc6VrRJZM0Y%3D",
    badge: "Diskon 77%",
    description: "Lembut keriting anti-kotor, tahan kompresi, dapat dicuci. Tersedia 7 warna.",
    sold: "11",
    rating: 5.0,
  },
  {
    id: "7",
    name: "Sofa Beanbag Kepadatan Tinggi Tahan Noda",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/f5e0c4b4aa3d4690b6ce3840e271176d~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088722&x-signature=1a9jfRrJi%2FHl3%2FqQfXGpb9Z0D%2BY%3D&x-signature-webp=VsJ6BFTtr6S%2B0DbCHbHpNQnr85Y%3D",
    badge: "Diskon 77%",
    description: "Kain kepadatan tinggi, nyaman dan lembut, tahan tekanan. Tersedia 7 warna.",
    sold: "2",
    rating: 5.0,
  },
  {
    id: "8",
    name: "Ready Stock Sofa Minimalis Lipat Tanpa Kaki",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/d0d563c28c6a42a9befc2b75a6e8e122~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088714&x-signature=VvrvSNfHRDz7bvUouOlMFqO8yAo%3D&x-signature-webp=2noV4QtSGfdBjH9ydCbIAw%2FLeTk%3D",
    badge: "Diskon 77%",
    description: "Sofa mini rumah kecil, bisa dibongkar cuci COD. Tersedia 7 warna.",
    sold: "20",
    rating: 5.0,
  },

  // === KASUR ===
  {
    id: "9",
    name: "Kasur Pegas Busa Memory Foam & Springs",
    category: "kasur",
    price: 1042854,
    originalPrice: 4042854,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/513526d6504d49d8b9f9fe6cabbbf52e~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088748&x-signature=TM9kZWhNPQlEUM1Xn8g6iEI7974%3D&x-signature-webp=kOMAL6q7S6rpU5fycG55rJUKgmA%3D",
    badge: "Diskon 74%",
    description: "Kombinasi memory foam dan springs, kekerasan sedang, penyangga pinggang. Cocok untuk rumah, kamar tamu, dan hotel. Ukuran 90-180cm.",
  },

  // === AKSESORIS ===
  {
    id: "10",
    name: "Bantal Memory Foam Original 100% Hotel Premium",
    category: "aksesoris",
    price: 200000,
    image: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/5478dbde5b01483e91f75ab2c7f84c38~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1776088701&x-signature=ixVyYBddfg96PcqjPRWXfPiPz00%3D&x-signature-webp=rKix0j9NqHl7rSEohcEInuc8yu8%3D",
    badge: "Terlaris",
    description: "Berbahan 100% memory foam, ukuran 35x55x12cm. Cocok untuk hotel dan rumah.",
    sold: "100+",
    rating: 5.0,
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export const WHATSAPP_NUMBER = "6281234567890";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppOrderUrl = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo NusaHome, saya tertarik dengan produk: ${productName}. Apakah masih tersedia?`)}`;
