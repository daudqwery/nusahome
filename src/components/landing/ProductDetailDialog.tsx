import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Info, Palette, Ruler, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { formatPrice, getWhatsAppOrderUrl, type Product, type SizeVariant } from "@/data/products";
import { productGalleries, productColorVariants } from "@/data/productImages";

const ImageZoomOverlay = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setScale(s => Math.min(4, Math.max(1, s - e.deltaY * 0.002)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [scale, position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
  }, [dragging, start]);

  const handlePointerUp = useCallback(() => setDragging(false), []);

  const toggleZoom = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/40 rounded-full p-2">
        <X className="h-5 w-5" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button onClick={(e) => { e.stopPropagation(); setScale(s => Math.max(1, s - 0.5)); }} className="text-white/80 hover:text-white bg-black/40 rounded-full p-2">
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="text-white/60 text-sm self-center px-2">{Math.round(scale * 100)}%</span>
        <button onClick={(e) => { e.stopPropagation(); setScale(s => Math.min(4, s + 0.5)); }} className="text-white/80 hover:text-white bg-black/40 rounded-full p-2">
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={toggleZoom}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
          draggable={false}
        />
      </div>
    </div>
  );
};

const ImageGallery = ({ productId, productName }: { productId: string; productName: string }) => {
  const images = productGalleries[productId] || [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img src={img} alt={`${productName} - foto ${i + 1}`} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>
      </div>
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
      <div className="flex items-center gap-1.5 mb-2.5">
        <Palette className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          Pilih warna: <span className="font-normal text-muted-foreground">{variants[selected].name}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => {
              setSelected(i);
              onSelect(v.image);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-full border-2 transition-all ${
              i === selected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40"
            }`}
          >
            <img src={v.image} alt={v.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <span className={`text-xs font-medium pr-1 ${i === selected ? "text-primary" : "text-foreground"}`}>{v.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SizeVariantPicker = ({
  sizeVariants,
  selectedIndex,
  onSelect,
}: {
  sizeVariants: SizeVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2.5">
        <Ruler className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          Pilih ukuran: <span className="font-normal text-muted-foreground">{sizeVariants[selectedIndex].size}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {sizeVariants.map((sv, i) => (
          <button
            key={sv.size}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
              i === selectedIndex
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/40"
            }`}
          >
            {sv.image && (
              <img src={sv.image} alt={sv.size} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
            )}
            <div className="text-left">
              <span className={`text-xs font-semibold block ${i === selectedIndex ? "text-primary" : "text-foreground"}`}>{sv.size}</span>
              {sv.weight && (
                <span className="text-[10px] text-muted-foreground">{sv.weight}</span>
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Selected size price detail */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
        <div className="flex items-center gap-2">
          {sizeVariants[selectedIndex].image && (
            <img src={sizeVariants[selectedIndex].image} alt="" className="w-10 h-10 rounded-md object-cover" />
          )}
          <div>
            <span className="text-xs font-medium text-foreground block">{sizeVariants[selectedIndex].size}</span>
            {sizeVariants[selectedIndex].weight && (
              <span className="text-[10px] text-muted-foreground">{sizeVariants[selectedIndex].weight}</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary block">{formatPrice(sizeVariants[selectedIndex].price)}</span>
          {sizeVariants[selectedIndex].originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">{formatPrice(sizeVariants[selectedIndex].originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductDetailDialog = ({ product, open, onClose }: { product: Product | null; open: boolean; onClose: () => void }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  // Reset size selection when product changes
  useEffect(() => {
    setSelectedSizeIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const hasSizeVariants = product.sizeVariants && product.sizeVariants.length > 0;
  const currentPrice = hasSizeVariants ? product.sizeVariants![selectedSizeIndex].price : product.price;
  const currentOriginalPrice = hasSizeVariants ? product.sizeVariants![selectedSizeIndex].originalPrice : product.originalPrice;
  const currentSize = hasSizeVariants ? product.sizeVariants![selectedSizeIndex].size : undefined;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-tight">{product.name}</DialogTitle>
        </DialogHeader>

        <ImageGallery productId={product.id} productName={product.name} />

        <div className="space-y-4">
          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-primary">{formatPrice(currentPrice)}</span>
            {currentOriginalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(currentOriginalPrice)}</span>
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

          {/* Color Variant Picker */}
          <ColorVariantPicker productId={product.id} onSelect={() => {}} />

          {/* Size Variants with pricing */}
          {hasSizeVariants && (
            <SizeVariantPicker
              sizeVariants={product.sizeVariants!}
              selectedIndex={selectedSizeIndex}
              onSelect={setSelectedSizeIndex}
            />
          )}

          {/* Simple sizes (for products without size variants) */}
          {!hasSizeVariants && product.sizes && product.sizes.length > 0 && (
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
            <a href={getWhatsAppOrderUrl(product.name, currentSize)} target="_blank" rel="noopener noreferrer">
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
