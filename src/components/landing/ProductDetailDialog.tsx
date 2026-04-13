import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Info, Palette, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice, getWhatsAppOrderUrl, type Product } from "@/data/products";
import { productGalleries, productColorVariants } from "@/data/productImages";

const ImageGallery = ({ productId, productName }: { productId: string; productName: string }) => {
  const images = productGalleries[productId] || [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useState(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className="relative">
      {/* Main carousel */}
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img src={img} alt={`${productName} - foto ${i + 1}`} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button onClick={scrollPrev} className="absolute left-1 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 shadow-md hover:bg-background">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={scrollNext} className="absolute right-1 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 shadow-md hover:bg-background">
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                i === selectedIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ColorVariantPicker = ({ productId, onSelect }: { productId: string; onSelect: (img: string) => void }) => {
  const variants = productColorVariants[productId];
  const [selected, setSelected] = useState(0);

  if (!variants || variants.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Palette className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Pilihan Warna</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => {
              setSelected(i);
              onSelect(v.image);
            }}
            className={`flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-lg border-2 transition-colors ${
              i === selected ? "border-primary bg-primary/5" : "border-transparent hover:border-muted"
            }`}
          >
            <img src={v.image} alt={v.name} className="w-12 h-12 rounded-md object-cover" />
            <span className="text-[10px] text-muted-foreground font-medium">{v.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProductDetailDialog = ({ product, open, onClose }: { product: Product | null; open: boolean; onClose: () => void }) => {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-tight">{product.name}</DialogTitle>
        </DialogHeader>

        {/* Swipeable Gallery */}
        <ImageGallery productId={product.id} productName={product.name} />

        <div className="space-y-4">
          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Rating & Sold */}
          {(product.rating || product.sold) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {product.rating && <span className="text-amber-500">⭐ {product.rating}</span>}
              {product.sold && <span>{product.sold} terjual</span>}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground">{product.description}</p>

          {/* Color Variant Picker with images */}
          <ColorVariantPicker productId={product.id} onSelect={() => {}} />

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Ruler className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Pilihan Ukuran</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Specs table */}
          {product.specs && product.specs.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Spesifikasi</span>
              </div>
              <div className="rounded-lg border overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div key={spec.label} className={`flex text-xs ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                    <span className="w-28 flex-shrink-0 font-medium text-foreground p-2 border-r">{spec.label}</span>
                    <span className="p-2 text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button className="w-full rounded-full" asChild>
            <a href={getWhatsAppOrderUrl(product.name)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Order via WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
