import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { products, formatPrice, getWhatsAppOrderUrl, type Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => (
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
      <div className="flex items-end gap-2 mb-3">
        <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>
      <Button size="sm" className="w-full rounded-full text-xs" asChild>
        <a href={getWhatsAppOrderUrl(product.name)} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-1 h-3.5 w-3.5" />
          Order via WhatsApp
        </a>
      </Button>
    </CardContent>
  </Card>
);

const CatalogSection = () => {
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
              <TabsTrigger key={cat.value} value={cat.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CatalogSection;
