export interface Product {
  id: string;
  name: string;
  category: "sofa" | "kasur" | "sofa-bed";
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sofa Minimalis 2 Seater",
    category: "sofa",
    price: 1299000,
    originalPrice: 1899000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    badge: "Best Seller",
    description: "Sofa minimalis modern, bahan fabric premium, rangka kayu solid",
  },
  {
    id: "2",
    name: "Sofa L Sudut Ruang Tamu",
    category: "sofa",
    price: 2499000,
    originalPrice: 3299000,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop",
    badge: "Diskon 25%",
    description: "Sofa L shape luas, cocok untuk keluarga, busa empuk tahan lama",
  },
  {
    id: "3",
    name: "Sofa Single Accent Chair",
    category: "sofa",
    price: 899000,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
    description: "Kursi sofa single elegan, cocok untuk sudut ruangan atau kamar",
  },
  {
    id: "4",
    name: "Sofa Retro Scandinavian",
    category: "sofa",
    price: 1799000,
    originalPrice: 2199000,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=300&fit=crop",
    description: "Desain Scandinavian classic, kaki kayu natural, bantal bisa dicuci",
  },
  {
    id: "5",
    name: "Kasur Memory Foam 160x200",
    category: "kasur",
    price: 1999000,
    originalPrice: 2999000,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    badge: "Terlaris",
    description: "Memory foam tebal 25cm, anti tungau, garansi 5 tahun",
  },
  {
    id: "6",
    name: "Kasur Spring Bed Pocket 120x200",
    category: "kasur",
    price: 1599000,
    originalPrice: 2199000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
    description: "Pocket spring individual, tidak bergoyang saat pasangan bergerak",
  },
  {
    id: "7",
    name: "Kasur Lipat Portable Latex",
    category: "kasur",
    price: 699000,
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&h=300&fit=crop",
    badge: "Praktis",
    description: "Kasur lipat 3 tebal 8cm, bahan latex natural, mudah disimpan",
  },
  {
    id: "8",
    name: "Kasur Busa Royal Foam 180x200",
    category: "kasur",
    price: 2499000,
    originalPrice: 3499000,
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=300&fit=crop",
    description: "King size premium, busa high density, cover anti air washable",
  },
  {
    id: "9",
    name: "Sofa Bed Lipat Minimalis",
    category: "sofa-bed",
    price: 1499000,
    originalPrice: 2099000,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop",
    badge: "Best Seller",
    description: "2 in 1: sofa siang hari, kasur malam hari. Busa tebal 15cm",
  },
  {
    id: "10",
    name: "Sofa Bed Reclining 3 Seater",
    category: "sofa-bed",
    price: 2899000,
    originalPrice: 3899000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    badge: "Premium",
    description: "Reclining system, bisa rebahan 180°, kulit sintetis premium",
  },
  {
    id: "11",
    name: "Sofa Bed Lantai Lesehan",
    category: "sofa-bed",
    price: 599000,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
    description: "Sofa bed lantai Japanese style, bisa dilipat, ringan dan mudah dipindah",
  },
  {
    id: "12",
    name: "Sofa Bed Storage Box",
    category: "sofa-bed",
    price: 1899000,
    originalPrice: 2499000,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop",
    description: "Sofa bed dengan storage di bawah, hemat ruangan, multifungsi",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

export const WHATSAPP_NUMBER = "6281234567890";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const getWhatsAppOrderUrl = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo NusaHome, saya tertarik dengan produk: ${productName}. Apakah masih tersedia?`)}`;
