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

// New product images
import sofaLShape from "@/assets/products/sofa-l-shape.jpg";
import sofaRecliner from "@/assets/products/sofa-recliner.jpg";
import sofaSudut from "@/assets/products/sofa-sudut.jpg";
import sofa2Seater from "@/assets/products/sofa-2-seater.jpg";
import poufOttoman from "@/assets/products/pouf-ottoman.jpg";
import kasurLipat from "@/assets/products/kasur-lipat.jpg";
import kasurLatex from "@/assets/products/kasur-latex.jpg";
import dipanKayu from "@/assets/products/dipan-kayu.jpg";
import topperKasur from "@/assets/products/topper-kasur.jpg";
import selimutHotel from "@/assets/products/selimut-hotel.jpg";
import selimutFleece from "@/assets/products/selimut-fleece.jpg";
import spreiSet from "@/assets/products/sprei-set.jpg";
import gulingSilikon from "@/assets/products/guling-silikon.jpg";
import pelindungKasur from "@/assets/products/pelindung-kasur.jpg";
import bantalSofa from "@/assets/products/bantal-sofa.jpg";
import coverSofa from "@/assets/products/cover-sofa.jpg";

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

// Main images map (product id -> main image)
export const productMainImages: Record<string, string> = {
  "1": sofaBedMinimalis,
  "2": sofabedLipatAesthetic,
  "3": sofaBed3in1,
  "4": beanbag2026,
  "5": sofaMalasLipat,
  "6": beanbagKuning,
  "7": beanbagOranye,
  "8": sofaMinimalisAbu,
  "9": kasurPegas,
  "10": bantalMemoryFoam,
  "11": kasurPegas,
  // New sofa bed
  "12": sofaRecliner,
  "13": sofaSudut,
  "14": sofabedLipatAesthetic, // reuse
  "15": sofaBed3in1, // reuse for futon
  "16": sofaBedMinimalis, // reuse for storage
  // New sofa
  "17": sofaLShape,
  "18": sofaSudut,
  "19": sofa2Seater,
  "20": sofaRecliner,
  "21": poufOttoman,
  // New kasur
  "22": kasurLatex,
  "23": kasurLipat,
  "24": kasurPegas, // reuse
  "25": kasurLatex, // reuse
  "26": dipanKayu,
  "27": topperKasur,
  // New aksesoris
  "28": gulingSilikon,
  "29": selimutHotel,
  "30": selimutFleece,
  "31": spreiSet,
  "32": pelindungKasur,
  "33": bantalSofa,
  "34": coverSofa,
};

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
  "11": [kasurPegas],
  "12": [sofaRecliner],
  "13": [sofaSudut],
  "14": [sofabedLipatAesthetic],
  "15": [sofaBed3in1],
  "16": [sofaBedMinimalis],
  "17": [sofaLShape],
  "18": [sofaSudut],
  "19": [sofa2Seater],
  "20": [sofaRecliner],
  "21": [poufOttoman],
  "22": [kasurLatex],
  "23": [kasurLipat],
  "24": [kasurPegas],
  "25": [kasurLatex],
  "26": [dipanKayu],
  "27": [topperKasur],
  "28": [gulingSilikon],
  "29": [selimutHotel],
  "30": [selimutFleece],
  "31": [spreiSet],
  "32": [pelindungKasur],
  "33": [bantalSofa],
  "34": [coverSofa],
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
