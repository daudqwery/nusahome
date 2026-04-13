import sofaBedMinimalis from "@/assets/products/sofa-bed-minimalis.jpg";
import sofabedLipatAesthetic from "@/assets/products/sofabed-lipat-aesthetic.jpg";
import sofaBed3in1 from "@/assets/products/sofa-bed-3in1.jpg";
import beanbag2026 from "@/assets/products/beanbag-2026.jpg";
import sofaMalasLipat from "@/assets/products/sofa-malas-lipat.jpg";
import beanbagKuning from "@/assets/products/beanbag-kuning.jpg";
import beanbagOranye from "@/assets/products/beanbag-oranye.jpg";
import sofaMinimalisAbu from "@/assets/products/sofa-minimalis-abu.jpg";
import kasurPegas from "@/assets/products/kasur-pegas.jpg";
import bantalMemoryFoam from "@/assets/products/bantal-memory-foam.jpg";

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
  specs?: { label: string; value: string }[];
  colors?: string[];
  sizes?: string[];
  weight?: string;
}

export const products: Product[] = [
  // === SOFA BED ===
  {
    id: "1",
    name: "Sofa Bed Minimalis Ruang Tamu Serbaguna",
    category: "sofa-bed",
    price: 1945000,
    originalPrice: 2945000,
    image: sofaBedMinimalis,
    badge: "Best Seller",
    description: "Kepadatan kain nyaman dan mewah, desain lembut cocok untuk ruang tamu. Keriting anti-kotor, tahan kompresi, dapat dicuci. Rangka kuat & sandaran bisa dilepas. Garansi resmi 10 tahun.",
    sold: "500+",
    rating: 4.7,
    specs: [
      { label: "Berat", value: "35 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi anti-air" },
      { label: "Rangka", value: "Logam galvanis" },
      { label: "Rating", value: "4.7 (98 rating)" },
    ],
    colors: ["Abu-Abu", "Oranye", "Hijau", "Putih"],
    sizes: ["90CM (1 Orang)", "135CM (2 Orang Kecil)", "150CM (2 Orang Besar)", "180CM (3 Orang)"],
    weight: "35 kg",
  },
  {
    id: "2",
    name: "Sofabed Lipat Aesthetic Modern Multifungsi",
    category: "sofa-bed",
    price: 2500000,
    originalPrice: 9500000,
    image: sofabedLipatAesthetic,
    badge: "Diskon 74%",
    description: "Sofa lipat multifungsi 2in1 dengan desain inovatif. Bahan kain anti-air, rangka logam galvanis, uji kekuatan 10.000 kali duduk. Mudah dirawat dengan microfiber atau vacuum.",
    sold: undefined,
    rating: 5.0,
    specs: [
      { label: "Berat", value: "58 - 88 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Kategori", value: "Sofa Bed" },
      { label: "Bahan", value: "Kain anti-air, rangka logam galvanis" },
      { label: "Desain", value: "Inovatif 2in1" },
      { label: "Garansi", value: "10 Tahun" },
    ],
    colors: ["Oranye", "Hijau", "Putih", "Abu-Abu", "Coklat Muda", "Putih Kuningan", "Hijau Tua"],
    sizes: ["90CM (1 Orang)", "135CM (2 Orang Kecil)", "150CM (2 Orang Besar)", "180CM (3 Orang)"],
    weight: "58-88 kg",
  },
  {
    id: "3",
    name: "Sofa Bed 3 in 1 Bisa Jadi Kasur Tidur",
    category: "sofa-bed",
    price: 1945000,
    originalPrice: 2945000,
    image: sofaBed3in1,
    badge: "Diskon 34%",
    description: "Modern simple desain elegan, mudah dibuka. Kain kepadatan tinggi, anti-kotor, tahan kompresi, dapat dicuci. 100% pembeli merasa puas.",
    sold: "100+",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "35 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "20 Hari" },
      { label: "Kategori", value: "Sofa Bed" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
      { label: "Rating", value: "5.0 (28 rating, 24 ulasan)" },
    ],
    colors: ["Abu-Abu", "Hijau", "Putih", "Oranye"],
    sizes: ["90CM", "135CM", "150CM", "180CM"],
    weight: "35 kg",
  },

  // === SOFA BEANBAG ===
  {
    id: "4",
    name: "Sofa Beanbag 2026 Nyaman Empuk Lembut",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: beanbag2026,
    badge: "Diskon 77%",
    description: "Sofa beanbag pilihan tepat untuk ruang tamu. Kepadatan kain nyaman dan mewah, anti-kotor, tahan kompresi, dapat dicuci dan tahan aus. Desain minimalis cocok berbagai gaya furnitur.",
    sold: "18",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru (Model 2025)" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
      { label: "Fitur", value: "Anti-noda, tahan kompresi, dapat dicuci" },
    ],
    colors: ["Pink", "Oranye", "Hijau", "Hitam", "Kuning", "Putih", "Abu-Abu"],
    weight: "9,4 kg",
  },
  {
    id: "5",
    name: "Sofa Malas Minimalis Lipat Tanpa Kaki",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: sofaMalasLipat,
    badge: "Diskon 77%",
    description: "Sofa beanbag lembut dan fleksibel. Tahan noda, tahan tekanan, dapat dicuci, tahan aus. Furnitur minimalis gaya baru, bisa dibongkar cuci.",
    sold: "2",
    rating: undefined,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
    ],
    colors: ["Putih", "Hijau", "Hitam", "Kuning", "Abu-Abu", "Pink", "Oranye"],
    weight: "9,4 kg",
  },
  {
    id: "6",
    name: "Sofa Beanbag Kepadatan Kain Nyaman Mewah",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: beanbagKuning,
    badge: "Diskon 77%",
    description: "Lembut keriting anti-kotor, tahan kompresi, dapat dicuci. Nyaman dan lembut, cocok untuk duduk lama. Mudah dibersihkan.",
    sold: "11",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
    ],
    colors: ["Kuning", "Oranye", "Hijau", "Hitam", "Putih", "Abu-Abu", "Warna Pink"],
    weight: "9,4 kg",
  },
  {
    id: "7",
    name: "Sofa Beanbag Kepadatan Tinggi Tahan Noda",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: beanbagOranye,
    badge: "Diskon 77%",
    description: "Kain kepadatan tinggi, nyaman dan lembut, tahan noda dan tekanan. Dapat dicuci. Cocok untuk ruang tamu Anda.",
    sold: "2",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
    ],
    colors: ["Oranye", "Hijau", "Hitam", "Kuning", "Putih", "Abu-Abu", "Warna Pink"],
    weight: "9,4 kg",
  },
  {
    id: "8",
    name: "Ready Stock Sofa Minimalis Lipat Tanpa Kaki",
    category: "sofa",
    price: 1200000,
    originalPrice: 5200000,
    image: sofaMinimalisAbu,
    badge: "Diskon 77%",
    description: "Sofa mini rumah kecil, bisa dibongkar cuci. Anti-kotor, tahan kompresi, furnitur minimalis. Ready stock, COD tersedia.",
    sold: "20",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
    ],
    colors: ["Abu-Abu", "Hijau", "Hitam", "Kuning", "Putih", "Warna Pink", "Oranye"],
    weight: "9,4 kg",
  },

  // === KASUR ===
  {
    id: "9",
    name: "Kasur Pegas Busa Memory Foam & Springs",
    category: "kasur",
    price: 1042854,
    originalPrice: 4042854,
    image: kasurPegas,
    badge: "Diskon 74%",
    description: "Kombinasi memory foam dan springs. Kekerasan sedang, penyangga pinggang, mendukung postur tubuh. Cocok untuk rumah, kamar tamu, dan hotel.",
    sold: undefined,
    rating: undefined,
    specs: [
      { label: "Berat", value: "25-33 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Kategori", value: "Kasur" },
      { label: "Bahan", value: "Memory Foam + Springs" },
      { label: "Kekerasan", value: "Sedang" },
    ],
    sizes: ["90×200×26CM", "120×200×26CM", "140×200×26CM", "160×200×26CM", "180×200×26CM"],
    weight: "25-33 kg",
  },

  // === AKSESORIS ===
  {
    id: "10",
    name: "Bantal Memory Foam Original 100% Hotel Premium",
    category: "aksesoris",
    price: 200000,
    image: bantalMemoryFoam,
    badge: "Terlaris",
    description: "Berbahan 100% memory foam. Ukuran 35×55×12cm. Kualitas hotel premium untuk tidur nyaman setiap malam.",
    sold: "100+",
    rating: 5.0,
    specs: [
      { label: "Berat", value: "300 g" },
      { label: "Ukuran", value: "35 × 55 × 12 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Kategori", value: "Bantal Kepala" },
      { label: "Bahan", value: "100% Memory Foam" },
    ],
    sizes: ["35×55cm"],
    weight: "300 g",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export const WHATSAPP_NUMBER = "6281234567890";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppOrderUrl = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo NusaHome, saya tertarik dengan produk: ${productName}. Apakah masih tersedia?`)}`;
