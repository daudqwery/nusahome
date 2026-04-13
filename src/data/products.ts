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
import sofabedLipatHitam from "@/assets/products/sofabed-lipat-hitam.jpg";
import kasurPegasMain from "@/assets/products/kasur-pegas-main.jpg";

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
  ratingCount?: number;
  reviewCount?: number;
  satisfaction?: number;
  specs?: { label: string; value: string }[];
  colors?: string[];
  sizes?: string[];
  weight?: string;
  preorder?: string;
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
    description: "Sofa NusaHome hadir dengan kepadatan kain yang nyaman. Desain mewah dan lembut, cocok untuk ruang tamu. Keriting anti-kotor dan tahan kompresi, menjaga kebersihan dan bentuk sofa. Dapat dicuci, memastikan keawetan dan kenyamanan jangka panjang. Rangka kuat & sandaran bisa dilepas.",
    sold: "500+",
    rating: 4.7,
    ratingCount: 98,
    reviewCount: 84,
    satisfaction: 91,
    specs: [
      { label: "Berat", value: "35 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi anti-kotor" },
      { label: "Rangka", value: "Logam galvanis" },
      { label: "Garansi", value: "10 Tahun" },
      { label: "Fitur", value: "Vacuum anti bau, sandaran bisa dilepas" },
      { label: "Rating", value: "4.7 (98 rating, 84 ulasan)" },
      { label: "Kepuasan", value: "91% pembeli puas" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    colors: ["Abu-Abu", "Oranye", "Hijau", "Putih"],
    sizes: ["90CM (1 Orang)", "135CM (2 Orang Kecil)", "150CM (2 Orang Besar)", "180CM (3 Orang)"],
    weight: "35 kg",
    preorder: "30 Hari",
  },
  {
    id: "2",
    name: "Sofabed Lipat Aesthetic Modern Multifungsi",
    category: "sofa-bed",
    price: 2500000,
    originalPrice: 9500000,
    image: sofabedLipatHitam,
    badge: "Diskon 74%",
    description: "Sofa lipat multifungsi dengan desain double folding, cocok untuk ruang kecil dan rumah. Terbuat dari bahan corduroy velvet yang lembut dan nyaman. Ideal untuk pertemuan keluarga dan ruang tamu. Kompresi tanpa tulang, seamless compression.",
    sold: undefined,
    rating: undefined,
    ratingCount: 0,
    reviewCount: 0,
    specs: [
      { label: "Berat", value: "33,4 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Sofa Bed" },
      { label: "Bahan", value: "Corduroy Velvet" },
      { label: "Desain", value: "Double Folding Multifungsi" },
      { label: "Fitur", value: "Seamless compression, tanpa tulang" },
      { label: "Cocok untuk", value: "Ruang kecil, rumah, pertemuan keluarga" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Kargo" },
    ],
    colors: ["Hitam", "Hijau", "Merah Muda", "Oranye", "Abu-Abu", "Putih"],
    weight: "33,4 kg",
  },
  {
    id: "3",
    name: "Sofa Bed 3 in 1 Bisa Jadi Kasur Tidur",
    category: "sofa-bed",
    price: 1945000,
    originalPrice: 2945000,
    image: sofaBed3in1,
    badge: "Diskon 34%",
    description: "Modern simple desain elegan, mudah dibuka. Kain kepadatan tinggi, anti-kotor, tahan kompresi, dapat dicuci. Sofa bed 3 in 1 bisa jadi kasur tidur, sangat praktis. 100% pembeli merasa puas.",
    sold: "100+",
    rating: 5.0,
    ratingCount: 28,
    reviewCount: 24,
    satisfaction: 100,
    specs: [
      { label: "Berat", value: "35 kg" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "20 Hari" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Sofa Bed" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
      { label: "Fitur", value: "3 in 1: Sofa, Bed, Kasur Tidur" },
      { label: "Rating", value: "5.0 (28 rating, 24 ulasan)" },
      { label: "Kepuasan", value: "100% pembeli puas" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    colors: ["Abu-Abu", "Hijau", "Putih", "Oranye"],
    sizes: ["90CM", "135CM", "150CM", "180CM"],
    weight: "35 kg",
    preorder: "20 Hari",
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
    description: "Sofa Beanbag NusaHome adalah pilihan tepat untuk ruang tamu Anda. Dengan kepadatan kain yang nyaman dan mewah, sofa ini memberikan kenyamanan maksimal. Nyaman dan lembut, cocok untuk duduk lama. Anti-kotor, tahan kompresi, dapat dicuci.",
    sold: "18",
    rating: 5.0,
    ratingCount: 1,
    reviewCount: 1,
    satisfaction: 100,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru (Model 2026)" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
      { label: "Fitur", value: "Anti-noda, tahan kompresi, dapat dicuci, tahan aus" },
      { label: "Desain", value: "Sederhana dan minimalis, cocok berbagai gaya" },
      { label: "Rating", value: "5.0 (1 rating, 1 ulasan)" },
      { label: "Kepuasan", value: "100% pembeli puas" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
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
    description: "Sofa beanbag lembut dan fleksibel. Tahan noda, tahan tekanan, dapat dicuci, tahan aus. Furnitur minimalis gaya baru, bisa dibongkar cuci. Cocok untuk ruang tamu minimalis.",
    sold: "2",
    rating: undefined,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
      { label: "Fitur", value: "Lipat tanpa kaki, bisa dibongkar cuci" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
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
    description: "Lembut keriting anti-kotor, tahan kompresi, dapat dicuci. Nyaman dan lembut, cocok untuk duduk lama. Mudah dibersihkan. Desain mewah dengan kepadatan kain tinggi.",
    sold: "11",
    rating: 5.0,
    ratingCount: 3,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
      { label: "Fitur", value: "Anti-kotor, tahan kompresi, dapat dicuci, tahan aus" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    colors: ["Kuning", "Oranye", "Hijau", "Hitam", "Putih", "Abu-Abu", "Pink"],
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
    description: "Kain kepadatan tinggi, nyaman dan lembut, tahan noda dan tekanan. Dapat dicuci. Cocok untuk ruang tamu Anda. NusaHome sofa beanbag kualitas premium.",
    sold: "2",
    rating: 5.0,
    ratingCount: 1,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain kepadatan tinggi" },
      { label: "Fitur", value: "Tahan noda, tahan tekanan, dapat dicuci" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    colors: ["Oranye", "Hijau", "Hitam", "Kuning", "Putih", "Abu-Abu", "Pink"],
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
    description: "Sofa mini rumah kecil, bisa dibongkar cuci. Anti-kotor, tahan kompresi, furnitur minimalis. Ready stock, COD tersedia. Pengiriman dari Kab. Tangerang.",
    sold: "20",
    rating: 5.0,
    ratingCount: 5,
    specs: [
      { label: "Berat", value: "9,4 kg" },
      { label: "Ukuran", value: "70 x 90 x 70 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bean Bag" },
      { label: "Bahan", value: "Kain keriting anti-kotor" },
      { label: "Fitur", value: "Ready stock, bisa dibongkar cuci, COD tersedia" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    colors: ["Abu-Abu", "Hijau", "Hitam", "Kuning", "Putih", "Pink", "Oranye"],
    weight: "9,4 kg",
  },

  // === KASUR ===
  {
    id: "9",
    name: "Kasur Pegas Busa Memory Foam & Springs 26CM",
    category: "kasur",
    price: 1042854,
    originalPrice: 4042854,
    image: kasurPegasMain,
    badge: "Diskon 74%",
    description: "Kombinasi memory foam dan springs. Kekerasan sedang, penyangga pinggang, mendukung postur tubuh. Cocok untuk rumah, kamar tamu, dan hotel. Pilihan ukuran dari Anak 90 sampai King 180.",
    sold: undefined,
    rating: undefined,
    specs: [
      { label: "Berat", value: "25-33 kg" },
      { label: "Tebal", value: "26 CM" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Kasur" },
      { label: "Bahan", value: "Memory Foam + Springs" },
      { label: "Kekerasan", value: "Sedang (Medium)" },
      { label: "Fitur", value: "Penyangga pinggang, mendukung postur tubuh" },
      { label: "Cocok untuk", value: "Rumah, kamar tamu, hotel" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    sizes: ["90×200×26CM (Anak)", "120×200×26CM (Single)", "140×200×26CM (Single)", "160×200×26CM (Queen)", "180×200×26CM (King)"],
    weight: "25-33 kg",
    preorder: "30 Hari",
  },
  {
    id: "11",
    name: "Kasur Memory Foam & Springs Ekonomis 20CM",
    category: "kasur",
    price: 741000,
    image: kasurPegas,
    badge: "Hemat",
    description: "Kasur memory foam dan springs dengan ketebalan 20CM. Kekerasan sedang, penyangga pinggang, mendukung postur tubuh. Pilihan ekonomis untuk kenyamanan optimal di rumah, kamar tamu, dan hotel.",
    sold: undefined,
    rating: undefined,
    specs: [
      { label: "Berat", value: "20-28 kg" },
      { label: "Tebal", value: "20 CM" },
      { label: "Kondisi", value: "Baru" },
      { label: "Preorder", value: "30 Hari" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Kasur" },
      { label: "Bahan", value: "Memory Foam + Springs" },
      { label: "Kekerasan", value: "Sedang (Medium)" },
      { label: "Fitur", value: "Penyangga pinggang, mendukung postur tubuh" },
      { label: "Cocok untuk", value: "Rumah, kamar tamu, hotel" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
    ],
    sizes: ["90×200×20CM (Anak)", "120×200×20CM (Single)", "140×200×20CM (Single)", "160×200×20CM (Queen)", "180×200×20CM (King)"],
    weight: "20-28 kg",
    preorder: "30 Hari",
  },

  // === AKSESORIS ===
  {
    id: "10",
    name: "Bantal Memory Foam Original 100% Hotel Premium",
    category: "aksesoris",
    price: 200000,
    image: bantalMemoryFoam,
    badge: "Terlaris",
    description: "Berbahan 100% memory foam. Ukuran 35×55×12cm. Kualitas hotel premium untuk tidur nyaman setiap malam. Sudah terjual 100+ dengan rating sempurna 5.0.",
    sold: "100+",
    rating: 5.0,
    ratingCount: 15,
    satisfaction: 100,
    specs: [
      { label: "Berat", value: "300 g" },
      { label: "Ukuran", value: "35 × 55 × 12 cm" },
      { label: "Kondisi", value: "Baru" },
      { label: "Min. Beli", value: "1 Buah" },
      { label: "Kategori", value: "Bantal Kepala" },
      { label: "Bahan", value: "100% Memory Foam" },
      { label: "Kualitas", value: "Hotel Premium" },
      { label: "Rating", value: "5.0 (100+ terjual)" },
      { label: "Pengiriman", value: "Dari Kab. Tangerang, Bisa COD" },
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
