import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Info, Palette } from "lucide-react";
import { products as staticProducts } from "@/data/products";
import { formatPrice, getWhatsAppOrderUrl, type Product } from "@/data/products";
import ProductDetailDialog from "@/components/landing/ProductDetailDialog";

// Fetch products from DB grouped by category
const useDbProducts = () => {
  return useQuery({
    queryKey: ["landing-products"],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from("products")
        .select(`
          *,
          product_categories(category_id, categories(name, slug)),
          product_images(image_url, sort_order, is_thumbnail),
          product_specifications(label, value, sort_order),
          variant_types(id, name, sort_order, variant_options(id, value, image_url, sort_order)),
          product_variants(id, sku, price, original_price, stock, weight, dimensions, image_url, is_active, product_variant_values(option_id, variant_options(value)))
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return products;
    },
    staleTime: 60000,
  });
};

// Transform DB product to the landing page Product type
const toProduct = (dbProduct: any): Product => {
  const thumbnail = dbProduct.product_images?.find((i: any) => i.is_thumbnail)?.image_url
    || dbProduct.product_images?.[0]?.image_url
    || dbProduct.thumbnail_url
    || "/placeholder.svg";

  const specs = (dbProduct.product_specifications || [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((s: any) => ({ label: s.label, value: s.value }));

  // Extract color options from variant_types named "Warna"
  const colorType = (dbProduct.variant_types || []).find((vt: any) => vt.name.toLowerCase().includes("warna"));
  const colors = colorType?.variant_options?.map((o: any) => o.value) || [];

  // Extract size variants
  const sizeType = (dbProduct.variant_types || []).find((vt: any) => vt.name.toLowerCase().includes("ukuran") || vt.name.toLowerCase().includes("size"));
  const sizeOptions = sizeType?.variant_options || [];

  // Map product_variants to sizeVariants
  const sizeVariants = (dbProduct.product_variants || [])
    .filter((v: any) => v.is_active)
    .map((v: any) => {
      const optionLabels = (v.product_variant_values || []).map((pv: any) => pv.variant_options?.value).filter(Boolean);
      const sizeLabel = optionLabels.find((l: string) => sizeOptions.some((so: any) => so.value === l)) || optionLabels[0] || "";
      return {
        size: sizeLabel || v.sku || "Default",
        price: v.price,
        originalPrice: v.original_price,
        weight: v.weight,
        dimensions: v.dimensions,
        image: v.image_url || thumbnail,
      };
    });

  // Get primary category slug for tab filtering
  const primaryCatSlug = dbProduct.product_categories?.[0]?.categories?.slug || "sofa";

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: primaryCatSlug as any,
    price: dbProduct.base_price,
    originalPrice: dbProduct.original_price || undefined,
    image: thumbnail,
    badge: dbProduct.badge || undefined,
    description: dbProduct.description || "",
    sold: dbProduct.sold_count || undefined,
    rating: dbProduct.rating || undefined,
    specs: specs.length > 0 ? specs : undefined,
    colors: colors.length > 0 ? colors : undefined,
    sizeVariants: sizeVariants.length > 0 ? sizeVariants : undefined,
    weight: dbProduct.weight || undefined,
  };
};

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

const CatalogSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: dbProducts } = useDbProducts();

  // Use static data as fallback, DB data as primary
  const { products: staticProducts } = require("@/data/products");

  const dbMappedProducts = dbProducts && dbProducts.length > 0
    ? dbProducts.map(toProduct)
    : null;

  const allProducts: Product[] = dbMappedProducts || staticProducts;

  // Get unique categories from products
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
                {allProducts
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
