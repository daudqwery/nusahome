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

// Real color variant images - Sofa Bed (from Tokopedia NusaHome)
import sofabedOranyeReal from "@/assets/products/sofabed-oranye-real.jpg";
import sofabedAbuabuReal from "@/assets/products/sofabed-abuabu-real.jpg";
import sofabedPutihReal from "@/assets/products/sofabed-putih-real.jpg";
import sofabedHijauReal from "@/assets/products/sofabed-hijau-real.jpg";

// Real color variant images - Beanbag (from Tokopedia NusaHome)
import beanbagOranyeReal from "@/assets/products/beanbag-oranye-real.jpg";
import beanbagKuningReal from "@/assets/products/beanbag-kuning-real.jpg";
import beanbagPinkReal from "@/assets/products/beanbag-pink-real.jpg";
import beanbagHijauReal from "@/assets/products/beanbag-hijau-real.jpg";
import beanbagHitamReal from "@/assets/products/beanbag-hitam-real.jpg";
import beanbagPutihReal from "@/assets/products/beanbag-putih-real.jpg";
import beanbagAbuabuReal from "@/assets/products/beanbag-abuabu-real.jpg";

export interface ColorVariant {
  name: string;
  image: string;
}

// Gallery images per product (id -> images array)
export const productGalleries: Record<string, string[]> = {
  "1": [sofaBedMinimalis, sofabedOranyeReal, sofabedAbuabuReal, sofabedHijauReal, sofabedPutihReal],
  "2": [sofabedLipatAesthetic, sofabedOranyeReal, sofabedHijauReal, sofabedPutihReal, sofabedAbuabuReal],
  "3": [sofaBed3in1, sofabedAbuabuReal, sofabedOranyeReal, sofabedHijauReal, sofabedPutihReal],
  "4": [beanbag2026, beanbagPinkReal, beanbagHijauReal, beanbagHitamReal, beanbagAbuabuReal, beanbagPutihReal],
  "5": [sofaMalasLipat, beanbagPutihReal, beanbagHijauReal, beanbagHitamReal, beanbagAbuabuReal, beanbagPinkReal],
  "6": [beanbagKuning, beanbagOranyeReal, beanbagHijauReal, beanbagHitamReal, beanbagPutihReal, beanbagAbuabuReal],
  "7": [beanbagOranye, beanbagHijauReal, beanbagHitamReal, beanbagKuningReal, beanbagPutihReal, beanbagAbuabuReal],
  "8": [sofaMinimalisAbu, beanbagHijauReal, beanbagHitamReal, beanbagKuningReal, beanbagPutihReal, beanbagPinkReal],
  "9": [kasurPegas],
  "10": [bantalMemoryFoam],
};

// Color variant images per product
export const productColorVariants: Record<string, ColorVariant[]> = {
  "1": [
    { name: "Oranye", image: sofabedOranyeReal },
    { name: "Abu-Abu", image: sofabedAbuabuReal },
    { name: "Hijau", image: sofabedHijauReal },
    { name: "Putih", image: sofabedPutihReal },
  ],
  "2": [
    { name: "Oranye", image: sofabedOranyeReal },
    { name: "Hijau", image: sofabedHijauReal },
    { name: "Putih", image: sofabedPutihReal },
    { name: "Abu-Abu", image: sofabedAbuabuReal },
  ],
  "3": [
    { name: "Abu-Abu", image: sofabedAbuabuReal },
    { name: "Oranye", image: sofabedOranyeReal },
    { name: "Hijau", image: sofabedHijauReal },
    { name: "Putih", image: sofabedPutihReal },
  ],
  "4": [
    { name: "Oranye", image: beanbagOranyeReal },
    { name: "Pink", image: beanbagPinkReal },
    { name: "Hijau", image: beanbagHijauReal },
    { name: "Hitam", image: beanbagHitamReal },
    { name: "Kuning", image: beanbagKuningReal },
    { name: "Putih", image: beanbagPutihReal },
    { name: "Abu-Abu", image: beanbagAbuabuReal },
  ],
  "5": [
    { name: "Oranye", image: beanbagOranyeReal },
    { name: "Putih", image: beanbagPutihReal },
    { name: "Hijau", image: beanbagHijauReal },
    { name: "Hitam", image: beanbagHitamReal },
    { name: "Kuning", image: beanbagKuningReal },
    { name: "Abu-Abu", image: beanbagAbuabuReal },
    { name: "Pink", image: beanbagPinkReal },
  ],
  "6": [
    { name: "Kuning", image: beanbagKuningReal },
    { name: "Oranye", image: beanbagOranyeReal },
    { name: "Hijau", image: beanbagHijauReal },
    { name: "Hitam", image: beanbagHitamReal },
    { name: "Putih", image: beanbagPutihReal },
    { name: "Abu-Abu", image: beanbagAbuabuReal },
    { name: "Pink", image: beanbagPinkReal },
  ],
  "7": [
    { name: "Oranye", image: beanbagOranyeReal },
    { name: "Hijau", image: beanbagHijauReal },
    { name: "Hitam", image: beanbagHitamReal },
    { name: "Kuning", image: beanbagKuningReal },
    { name: "Putih", image: beanbagPutihReal },
    { name: "Abu-Abu", image: beanbagAbuabuReal },
    { name: "Pink", image: beanbagPinkReal },
  ],
  "8": [
    { name: "Abu-Abu", image: beanbagAbuabuReal },
    { name: "Hijau", image: beanbagHijauReal },
    { name: "Hitam", image: beanbagHitamReal },
    { name: "Kuning", image: beanbagKuningReal },
    { name: "Putih", image: beanbagPutihReal },
    { name: "Pink", image: beanbagPinkReal },
    { name: "Oranye", image: beanbagOranyeReal },
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
