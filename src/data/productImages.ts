// Main product images
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

// Color variant images - Sofa Bed
import sofabedGray from "@/assets/products/sofabed-gray.jpg";
import sofabedOrange from "@/assets/products/sofabed-orange.jpg";
import sofabedGreen from "@/assets/products/sofabed-green.jpg";
import sofabedWhite from "@/assets/products/sofabed-white.jpg";

// Color variant images - Beanbag
import beanbagPink from "@/assets/products/beanbag-pink.jpg";
import beanbagGreen from "@/assets/products/beanbag-green.jpg";
import beanbagBlack from "@/assets/products/beanbag-black.jpg";
import beanbagGray from "@/assets/products/beanbag-gray.jpg";
import beanbagWhite from "@/assets/products/beanbag-white.jpg";

// Detail images
import kasurPegasDetail from "@/assets/products/kasur-pegas-detail.jpg";

export interface ColorVariant {
  name: string;
  image: string;
}

// Gallery images per product (id -> images array)
export const productGalleries: Record<string, string[]> = {
  "1": [sofaBedMinimalis, sofabedGray, sofabedOrange, sofabedGreen, sofabedWhite],
  "2": [sofabedLipatAesthetic, sofabedOrange, sofabedGreen, sofabedWhite, sofabedGray],
  "3": [sofaBed3in1, sofabedGray, sofabedOrange, sofabedGreen, sofabedWhite],
  "4": [beanbag2026, beanbagPink, beanbagGreen, beanbagBlack, beanbagGray, beanbagWhite],
  "5": [sofaMalasLipat, beanbagWhite, beanbagGreen, beanbagBlack, beanbagGray, beanbagPink],
  "6": [beanbagKuning, beanbagOranye, beanbagGreen, beanbagBlack, beanbagWhite, beanbagGray],
  "7": [beanbagOranye, beanbagGreen, beanbagBlack, beanbagKuning, beanbagWhite, beanbagGray],
  "8": [sofaMinimalisAbu, beanbagGreen, beanbagBlack, beanbagKuning, beanbagWhite, beanbagPink],
  "9": [kasurPegas, kasurPegasDetail],
  "10": [bantalMemoryFoam],
};

// Color variant images per product
export const productColorVariants: Record<string, ColorVariant[]> = {
  "1": [
    { name: "Abu-Abu", image: sofabedGray },
    { name: "Oranye", image: sofabedOrange },
    { name: "Hijau", image: sofabedGreen },
    { name: "Putih", image: sofabedWhite },
  ],
  "2": [
    { name: "Oranye", image: sofabedOrange },
    { name: "Hijau", image: sofabedGreen },
    { name: "Putih", image: sofabedWhite },
    { name: "Abu-Abu", image: sofabedGray },
  ],
  "3": [
    { name: "Abu-Abu", image: sofabedGray },
    { name: "Oranye", image: sofabedOrange },
    { name: "Hijau", image: sofabedGreen },
    { name: "Putih", image: sofabedWhite },
  ],
  "4": [
    { name: "Pink", image: beanbagPink },
    { name: "Oranye", image: beanbagOranye },
    { name: "Hijau", image: beanbagGreen },
    { name: "Hitam", image: beanbagBlack },
    { name: "Kuning", image: beanbagKuning },
    { name: "Putih", image: beanbagWhite },
    { name: "Abu-Abu", image: beanbagGray },
  ],
  "5": [
    { name: "Putih", image: beanbagWhite },
    { name: "Hijau", image: beanbagGreen },
    { name: "Hitam", image: beanbagBlack },
    { name: "Kuning", image: beanbagKuning },
    { name: "Abu-Abu", image: beanbagGray },
    { name: "Pink", image: beanbagPink },
    { name: "Oranye", image: beanbagOranye },
  ],
  "6": [
    { name: "Kuning", image: beanbagKuning },
    { name: "Oranye", image: beanbagOranye },
    { name: "Hijau", image: beanbagGreen },
    { name: "Hitam", image: beanbagBlack },
    { name: "Putih", image: beanbagWhite },
    { name: "Abu-Abu", image: beanbagGray },
    { name: "Pink", image: beanbagPink },
  ],
  "7": [
    { name: "Oranye", image: beanbagOranye },
    { name: "Hijau", image: beanbagGreen },
    { name: "Hitam", image: beanbagBlack },
    { name: "Kuning", image: beanbagKuning },
    { name: "Putih", image: beanbagWhite },
    { name: "Abu-Abu", image: beanbagGray },
    { name: "Pink", image: beanbagPink },
  ],
  "8": [
    { name: "Abu-Abu", image: beanbagGray },
    { name: "Hijau", image: beanbagGreen },
    { name: "Hitam", image: beanbagBlack },
    { name: "Kuning", image: beanbagKuning },
    { name: "Putih", image: beanbagWhite },
    { name: "Pink", image: beanbagPink },
    { name: "Oranye", image: beanbagOranye },
  ],
};

// Main images (for backward compat with ProductCard)
export {
  sofaBedMinimalis,
  sofabedLipatAesthetic,
  sofaBed3in1,
  beanbag2026,
  sofaMalasLipat,
  beanbagKuning,
  beanbagOranye,
  sofaMinimalisAbu,
  kasurPegas,
  bantalMemoryFoam,
};
