import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, Layers, Image } from "lucide-react";

const AdminDashboard = () => {
  const { data: productCount } = useQuery({
    queryKey: ["admin-product-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: categoryCount } = useQuery({
    queryKey: ["admin-category-count"],
    queryFn: async () => {
      const { count } = await supabase.from("categories").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: variantCount } = useQuery({
    queryKey: ["admin-variant-count"],
    queryFn: async () => {
      const { count } = await supabase.from("product_variants").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: imageCount } = useQuery({
    queryKey: ["admin-image-count"],
    queryFn: async () => {
      const { count } = await supabase.from("product_images").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: "Produk", value: productCount ?? 0, icon: Package, color: "text-primary" },
    { label: "Kategori", value: categoryCount ?? 0, icon: FolderTree, color: "text-accent" },
    { label: "Variasi", value: variantCount ?? 0, icon: Layers, color: "text-primary" },
    { label: "Gambar", value: imageCount ?? 0, icon: Image, color: "text-accent" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-2xl font-bold text-foreground">{s.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
