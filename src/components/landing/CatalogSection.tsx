import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Info, Palette, Ruler } from "lucide-react";
import { products, formatPrice, getWhatsAppOrderUrl, type Product } from "@/data/products";

const ProductCard = ({ product, onDetail }: { product: Product; onDetail: (p: Product) => void }) => (
  <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {product.badge && (
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-none text-xs">
          {product.badge}
        </Badge>
      )}
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{product.name}</h3>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
      {(product.rating || product.sold) && (
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          {product.rating && <span className="text-amber-500">⭐ {product.rating}</span>}
          {product.sold && <span>{product.sold} terjual</span>}
        </div>
      )}

      {/* Color dots preview */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center gap-1 mb-2">
          <Palette className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{product.colors.length} warna</span>
        </div>
      )}

      <div className="flex items-end gap-2 mb-3">
        <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="rounded-full text-xs flex-shrink-0" onClick={() => onDetail(product)}>
          <Info className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" className="w-full rounded-full text-xs" asChild>
          <a href={getWhatsAppOrderUrl(product.name)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-1 h-3.5 w-3.5" />
            Order WhatsApp
          </a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ProductDetailDialog = ({ product, open, onClose }: { product: Product | null; open: boolean; onClose: () => void }) => {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-tight">{product.name}</DialogTitle>
        </DialogHeader>

        <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg" />

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

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Palette className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Pilihan Warna</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((c) => (
                  <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                ))}
              </div>
            </div>
          )}

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

const CatalogSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { value: "sofa", label: "Sofa" },
    { value: "sofa-bed", label: "Sofa Bed" },
    { value: "kasur", label: "Kasur" },
    { value: "aksesoris", label: "Aksesoris" },
  ] as const;

  return (
    <section id="katalog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
          Katalog Produk
        </h2>
        <p className="text-center text-muted-foreground mb-8">Pilih kategori produk favorit Anda</p>

        <Tabs defaultValue="sofa" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-8 bg-secondary">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.category === cat.value)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} onDetail={setSelectedProduct} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <ProductDetailDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default CatalogSection;
