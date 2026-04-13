// Real product images from Tokopedia NusaHome
import sofabedMinimalisReal from "@/assets/products/tokped/sofabed-minimalis-0.jpg";
import sofabedLipatReal from "@/assets/products/tokped/sofabed-lipat-0.jpg";
import sofabed3in1Real from "@/assets/products/tokped/sofabed-3in1-0.jpg";
import beanbag2026Real from "@/assets/products/tokped/beanbag-2026-0.jpg";
import sofaMalasLipatReal from "@/assets/products/tokped/sofa-malas-lipat-0.jpg";
import beanbagKuningReal from "@/assets/products/tokped/beanbag-kuning-0.jpg";
import beanbagOranyeReal from "@/assets/products/tokped/beanbag-oranye-0.jpg";
import sofaMinimalisAbuReal from "@/assets/products/tokped/sofa-minimalis-abu-0.jpg";
import kasurPegasReal from "@/assets/products/tokped/kasur-pegas-0.jpg";
import bantalFoamReal from "@/assets/products/tokped/bantal-foam-0.jpg";

// Generated images for new products (not in real Tokopedia store)
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
import sofabedOranyeVariant from "@/assets/products/sofabed-oranye-real.jpg";
import sofabedAbuabuVariant from "@/assets/products/sofabed-abuabu-real.jpg";
import sofabedPutihVariant from "@/assets/products/sofabed-putih-real.jpg";
import sofabedHijauVariant from "@/assets/products/sofabed-hijau-real.jpg";

// Real color variant images - Beanbag (from Tokopedia NusaHome)
import beanbagOranyeVariant from "@/assets/products/beanbag-oranye-real.jpg";
import beanbagKuningVariant from "@/assets/products/beanbag-kuning-real.jpg";
import beanbagPinkVariant from "@/assets/products/beanbag-pink-real.jpg";
import beanbagHijauVariant from "@/assets/products/beanbag-hijau-real.jpg";
import beanbagHitamVariant from "@/assets/products/beanbag-hitam-real.jpg";
import beanbagPutihVariant from "@/assets/products/beanbag-putih-real.jpg";
import beanbagAbuabuVariant from "@/assets/products/beanbag-abuabu-real.jpg";

export interface ColorVariant {
  name: string;
  image: string;
}

// Main images map (product id -> main image) - Real Tokopedia for original 10, generated for new 24
export const productMainImages: Record<string, string> = {
  // Original 10 products - REAL Tokopedia images
  "1": sofabedMinimalisReal,
  "2": sofabedLipatReal,
  "3": sofabed3in1Real,
  "4": beanbag2026Real,
  "5": sofaMalasLipatReal,
  "6": beanbagKuningReal,
  "7": beanbagOranyeReal,
  "8": sofaMinimalisAbuReal,
  "9": kasurPegasReal,
  "10": bantalFoamReal,
  "11": kasurPegasReal,
  // New sofa bed products
  "12": sofaRecliner,
  "13": sofaSudut,
  "14": sofabedLipatReal,
  "15": sofabed3in1Real,
  "16": sofabedMinimalisReal,
  // New sofa products
  "17": sofaLShape,
  "18": sofaSudut,
  "19": sofa2Seater,
  "20": sofaRecliner,
  "21": poufOttoman,
  // New kasur products
  "22": kasurLatex,
  "23": kasurLipat,
  "24": kasurPegasReal,
  "25": kasurLatex,
  "26": dipanKayu,
  "27": topperKasur,
  // New aksesoris products
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
  "1": [sofabedMinimalisReal, sofabedOranyeVariant, sofabedAbuabuVariant, sofabedHijauVariant, sofabedPutihVariant],
  "2": [sofabedLipatReal, sofabedOranyeVariant, sofabedHijauVariant, sofabedPutihVariant, sofabedAbuabuVariant],
  "3": [sofabed3in1Real, sofabedAbuabuVariant, sofabedOranyeVariant, sofabedHijauVariant, sofabedPutihVariant],
  "4": [beanbag2026Real, beanbagPinkVariant, beanbagHijauVariant, beanbagHitamVariant, beanbagAbuabuVariant, beanbagPutihVariant],
  "5": [sofaMalasLipatReal, beanbagPutihVariant, beanbagHijauVariant, beanbagHitamVariant, beanbagAbuabuVariant, beanbagPinkVariant],
  "6": [beanbagKuningReal, beanbagOranyeVariant, beanbagHijauVariant, beanbagHitamVariant, beanbagPutihVariant, beanbagAbuabuVariant],
  "7": [beanbagOranyeReal, beanbagHijauVariant, beanbagHitamVariant, beanbagKuningVariant, beanbagPutihVariant, beanbagAbuabuVariant],
  "8": [sofaMinimalisAbuReal, beanbagHijauVariant, beanbagHitamVariant, beanbagKuningVariant, beanbagPutihVariant, beanbagPinkVariant],
  "9": [kasurPegasReal],
  "10": [bantalFoamReal],
  "11": [kasurPegasReal],
  "12": [sofaRecliner],
  "13": [sofaSudut],
  "14": [sofabedLipatReal],
  "15": [sofabed3in1Real],
  "16": [sofabedMinimalisReal],
  "17": [sofaLShape],
  "18": [sofaSudut],
  "19": [sofa2Seater],
  "20": [sofaRecliner],
  "21": [poufOttoman],
  "22": [kasurLatex],
  "23": [kasurLipat],
  "24": [kasurPegasReal],
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

// Color variant images per product (real Tokopedia photos)
export const productColorVariants: Record<string, ColorVariant[]> = {
  "1": [
    { name: "Oranye", image: sofabedOranyeVariant },
    { name: "Abu-Abu", image: sofabedAbuabuVariant },
    { name: "Hijau", image: sofabedHijauVariant },
    { name: "Putih", image: sofabedPutihVariant },
  ],
  "2": [
    { name: "Oranye", image: sofabedOranyeVariant },
    { name: "Hijau", image: sofabedHijauVariant },
    { name: "Putih", image: sofabedPutihVariant },
    { name: "Abu-Abu", image: sofabedAbuabuVariant },
  ],
  "3": [
    { name: "Abu-Abu", image: sofabedAbuabuVariant },
    { name: "Oranye", image: sofabedOranyeVariant },
    { name: "Hijau", image: sofabedHijauVariant },
    { name: "Putih", image: sofabedPutihVariant },
  ],
  "4": [
    { name: "Oranye", image: beanbagOranyeVariant },
    { name: "Pink", image: beanbagPinkVariant },
    { name: "Hijau", image: beanbagHijauVariant },
    { name: "Hitam", image: beanbagHitamVariant },
    { name: "Kuning", image: beanbagKuningVariant },
    { name: "Putih", image: beanbagPutihVariant },
    { name: "Abu-Abu", image: beanbagAbuabuVariant },
  ],
  "5": [
    { name: "Oranye", image: beanbagOranyeVariant },
    { name: "Putih", image: beanbagPutihVariant },
    { name: "Hijau", image: beanbagHijauVariant },
    { name: "Hitam", image: beanbagHitamVariant },
    { name: "Kuning", image: beanbagKuningVariant },
    { name: "Abu-Abu", image: beanbagAbuabuVariant },
    { name: "Pink", image: beanbagPinkVariant },
  ],
  "6": [
    { name: "Kuning", image: beanbagKuningVariant },
    { name: "Oranye", image: beanbagOranyeVariant },
    { name: "Hijau", image: beanbagHijauVariant },
    { name: "Hitam", image: beanbagHitamVariant },
    { name: "Putih", image: beanbagPutihVariant },
    { name: "Abu-Abu", image: beanbagAbuabuVariant },
    { name: "Pink", image: beanbagPinkVariant },
  ],
  "7": [
    { name: "Oranye", image: beanbagOranyeVariant },
    { name: "Hijau", image: beanbagHijauVariant },
    { name: "Hitam", image: beanbagHitamVariant },
    { name: "Kuning", image: beanbagKuningVariant },
    { name: "Putih", image: beanbagPutihVariant },
    { name: "Abu-Abu", image: beanbagAbuabuVariant },
    { name: "Pink", image: beanbagPinkVariant },
  ],
  "8": [
    { name: "Abu-Abu", image: beanbagAbuabuVariant },
    { name: "Hijau", image: beanbagHijauVariant },
    { name: "Hitam", image: beanbagHitamVariant },
    { name: "Kuning", image: beanbagKuningVariant },
    { name: "Putih", image: beanbagPutihVariant },
    { name: "Pink", image: beanbagPinkVariant },
    { name: "Oranye", image: beanbagOranyeVariant },
  ],
};
