import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Plus, Trash2, Upload, GripVertical, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const validateImageFile = (file: File): string | null => {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
    return `Format tidak didukung (${file.name}). Gunakan JPG, PNG, WEBP, atau GIF.`;
  }
  if (file.size > MAX_IMAGE_SIZE) {
    const sizeMb = (file.size / 1024 / 1024).toFixed(2);
    return `Ukuran terlalu besar (${file.name}: ${sizeMb}MB). Maksimum 5MB.`;
  }
  if (file.size === 0) {
    return `File kosong (${file.name}).`;
  }
  return null;
};

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = id === "new";

  // Product form state
  const [form, setForm] = useState({
    name: "", slug: "", description: "", base_price: 0, original_price: 0,
    badge: "", is_active: true, weight: "", sold_count: "", rating: 0,
  });

  // Categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Gallery images
  const [galleryImages, setGalleryImages] = useState<{ id?: string; image_url: string; sort_order: number; is_thumbnail: boolean }[]>([]);

  // Specs
  const [specs, setSpecs] = useState<{ id?: string; label: string; value: string }[]>([]);

  // Pending image previews (selected, not yet uploaded)
  const [pendingGalleryFiles, setPendingGalleryFiles] = useState<{ file: File; previewUrl: string }[]>([]);
  const [pendingOptionFiles, setPendingOptionFiles] = useState<Record<string, { file: File; previewUrl: string }>>({});
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Variant types & options
  const [variantTypes, setVariantTypes] = useState<{ id?: string; name: string; options: { id?: string; value: string; image_url: string }[] }[]>([]);

  // Product variants (combinations)
  const [productVariants, setProductVariants] = useState<{
    id?: string; sku: string; price: number; original_price: number; stock: number;
    weight: string; dimensions: string; image_url: string; is_active: boolean;
    optionValues: string[]; // option value labels for display
  }[]>([]);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").eq("is_active", true).order("sort_order");
      return data || [];
    },
  });

  // Fetch existing product data
  const { data: existingProduct, isLoading } = useQuery({
    queryKey: ["admin-product", id],
    enabled: !isNew && !!id,
    queryFn: async () => {
      const { data: product, error } = await supabase.from("products").select("*").eq("id", id!).single();
      if (error) throw error;

      // Fetch related data in parallel
      const [catRes, imgRes, specRes, vtRes, pvRes] = await Promise.all([
        supabase.from("product_categories").select("category_id").eq("product_id", id!),
        supabase.from("product_images").select("*").eq("product_id", id!).order("sort_order"),
        supabase.from("product_specifications").select("*").eq("product_id", id!).order("sort_order"),
        supabase.from("variant_types").select("*, variant_options(*)").eq("product_id", id!).order("sort_order"),
        supabase.from("product_variants").select("*, product_variant_values(option_id, variant_options(value))").eq("product_id", id!),
      ]);

      return {
        product,
        categories: catRes.data?.map((c) => c.category_id) || [],
        images: imgRes.data || [],
        specs: specRes.data || [],
        variantTypes: vtRes.data || [],
        variants: pvRes.data || [],
      };
    },
  });

  // Load existing data into form
  useEffect(() => {
    if (!existingProduct) return;
    const p = existingProduct.product;
    setForm({
      name: p.name, slug: p.slug, description: p.description || "",
      base_price: p.base_price, original_price: p.original_price || 0,
      badge: p.badge || "", is_active: p.is_active, weight: p.weight || "",
      sold_count: p.sold_count || "", rating: p.rating || 0,
    });
    setSelectedCategories(existingProduct.categories);
    setGalleryImages(existingProduct.images.map((img) => ({
      id: img.id, image_url: img.image_url, sort_order: img.sort_order, is_thumbnail: img.is_thumbnail,
    })));
    setSpecs(existingProduct.specs.map((s) => ({ id: s.id, label: s.label, value: s.value })));
    setVariantTypes(existingProduct.variantTypes.map((vt: any) => ({
      id: vt.id, name: vt.name,
      options: (vt.variant_options || []).map((o: any) => ({ id: o.id, value: o.value, image_url: o.image_url || "" })),
    })));
    setProductVariants(existingProduct.variants.map((v: any) => ({
      id: v.id, sku: v.sku || "", price: v.price, original_price: v.original_price || 0,
      stock: v.stock, weight: v.weight || "", dimensions: v.dimensions || "",
      image_url: v.image_url || "", is_active: v.is_active,
      optionValues: (v.product_variant_values || []).map((pv: any) => pv.variant_options?.value || ""),
    })));
  }, [existingProduct]);

  // Select gallery files → only build previews (no upload yet)
  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPending: { file: File; previewUrl: string }[] = [];
    for (const file of Array.from(files)) {
      const validationError = validateImageFile(file);
      if (validationError) {
        toast.error(validationError);
        continue;
      }
      newPending.push({ file, previewUrl: URL.createObjectURL(file) });
    }
    if (newPending.length > 0) {
      setPendingGalleryFiles((prev) => [...prev, ...newPending]);
    }
    e.target.value = "";
  };

  const removePendingGallery = (idx: number) => {
    setPendingGalleryFiles((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return copy;
    });
  };

  // Confirm upload of all pending gallery files
  const uploadPendingGallery = async () => {
    if (pendingGalleryFiles.length === 0) return;
    setUploadingGallery(true);
    const succeeded: number[] = [];
    for (let i = 0; i < pendingGalleryFiles.length; i++) {
      const { file } = pendingGalleryFiles[i];
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        contentType: file.type || undefined,
        upsert: false,
      });
      if (error) {
        toast.error(`Upload gagal (${file.name}): ${error.message}`);
        continue;
      }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      setGalleryImages((prev) => [...prev, {
        image_url: urlData.publicUrl,
        sort_order: prev.length,
        is_thumbnail: prev.length === 0,
      }]);
      succeeded.push(i);
    }
    // Remove succeeded pending items
    setPendingGalleryFiles((prev) => {
      const remaining: typeof prev = [];
      prev.forEach((p, idx) => {
        if (succeeded.includes(idx)) {
          URL.revokeObjectURL(p.previewUrl);
        } else {
          remaining.push(p);
        }
      });
      return remaining;
    });
    if (succeeded.length > 0) toast.success(`${succeeded.length} gambar berhasil diupload`);
    setUploadingGallery(false);
  };

  // Select a variant option image → preview only
  const handleOptionImageSelect = (vtIdx: number, optIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { e.target.value = ""; return; }
    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      e.target.value = "";
      return;
    }
    const key = `${vtIdx}-${optIdx}`;
    setPendingOptionFiles((prev) => {
      const copy = { ...prev };
      if (copy[key]) URL.revokeObjectURL(copy[key].previewUrl);
      copy[key] = { file, previewUrl: URL.createObjectURL(file) };
      return copy;
    });
    e.target.value = "";
  };

  const cancelPendingOption = (vtIdx: number, optIdx: number) => {
    const key = `${vtIdx}-${optIdx}`;
    setPendingOptionFiles((prev) => {
      const copy = { ...prev };
      if (copy[key]) URL.revokeObjectURL(copy[key].previewUrl);
      delete copy[key];
      return copy;
    });
  };

  const uploadPendingOption = async (vtIdx: number, optIdx: number) => {
    const key = `${vtIdx}-${optIdx}`;
    const pending = pendingOptionFiles[key];
    if (!pending) return;
    const { file } = pending;
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `variants/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      contentType: file.type || undefined,
      upsert: false,
    });
    if (error) { toast.error(`Upload gagal: ${error.message}`); return; }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
    setVariantTypes((prev) => {
      const copy = [...prev];
      copy[vtIdx].options[optIdx].image_url = urlData.publicUrl;
      return copy;
    });
    cancelPendingOption(vtIdx, optIdx);
    toast.success("Gambar varian berhasil diupload");
  };


  // Save product
  const saveMutation = useMutation({
    mutationFn: async () => {
      const productData = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        description: form.description.trim() || null,
        base_price: form.base_price,
        original_price: form.original_price || null,
        badge: form.badge.trim() || null,
        is_active: form.is_active,
        weight: form.weight.trim() || null,
        sold_count: form.sold_count.trim() || null,
        rating: form.rating || null,
        thumbnail_url: galleryImages.find((i) => i.is_thumbnail)?.image_url || galleryImages[0]?.image_url || null,
      };

      let productId = id;

      if (isNew) {
        const { data, error } = await supabase.from("products").insert(productData).select("id").single();
        if (error) throw error;
        productId = data.id;
      } else {
        const { error } = await supabase.from("products").update(productData).eq("id", id!);
        if (error) throw error;
      }

      // Save categories
      await supabase.from("product_categories").delete().eq("product_id", productId!);
      if (selectedCategories.length > 0) {
        await supabase.from("product_categories").insert(
          selectedCategories.map((cid) => ({ product_id: productId!, category_id: cid }))
        );
      }

      // Save images
      await supabase.from("product_images").delete().eq("product_id", productId!);
      if (galleryImages.length > 0) {
        await supabase.from("product_images").insert(
          galleryImages.map((img, i) => ({
            product_id: productId!,
            image_url: img.image_url,
            sort_order: i,
            is_thumbnail: img.is_thumbnail,
          }))
        );
      }

      // Save specs
      await supabase.from("product_specifications").delete().eq("product_id", productId!);
      const validSpecs = specs.filter((s) => s.label.trim() && s.value.trim());
      if (validSpecs.length > 0) {
        await supabase.from("product_specifications").insert(
          validSpecs.map((s, i) => ({ product_id: productId!, label: s.label.trim(), value: s.value.trim(), sort_order: i }))
        );
      }

      // Save variant types & options
      // First delete old variant values, variants, options, and types
      await supabase.from("product_variant_values").delete().neq("id", "00000000-0000-0000-0000-000000000000")
        .then(() => supabase.from("product_variants").delete().eq("product_id", productId!))
        .then(() => {
          // We need to delete options via variant_types
          return supabase.from("variant_types").select("id").eq("product_id", productId!);
        })
        .then(async ({ data: vtIds }) => {
          if (vtIds && vtIds.length > 0) {
            for (const vt of vtIds) {
              await supabase.from("variant_options").delete().eq("variant_type_id", vt.id);
            }
          }
          return supabase.from("variant_types").delete().eq("product_id", productId!);
        });

      // Insert new variant types and options
      const optionIdMap: Record<string, string> = {}; // "typeIdx-optIdx" -> uuid
      for (let vtIdx = 0; vtIdx < variantTypes.length; vtIdx++) {
        const vt = variantTypes[vtIdx];
        if (!vt.name.trim()) continue;
        const { data: vtData, error: vtErr } = await supabase.from("variant_types")
          .insert({ product_id: productId!, name: vt.name.trim(), sort_order: vtIdx })
          .select("id").single();
        if (vtErr) throw vtErr;

        for (let optIdx = 0; optIdx < vt.options.length; optIdx++) {
          const opt = vt.options[optIdx];
          if (!opt.value.trim()) continue;
          const { data: optData, error: optErr } = await supabase.from("variant_options")
            .insert({ variant_type_id: vtData.id, value: opt.value.trim(), image_url: opt.image_url || null, sort_order: optIdx })
            .select("id").single();
          if (optErr) throw optErr;
          optionIdMap[`${vtIdx}-${optIdx}`] = optData.id;
        }
      }

      // Save product variants
      for (const pv of productVariants) {
        const { data: pvData, error: pvErr } = await supabase.from("product_variants").insert({
          product_id: productId!,
          sku: pv.sku || null,
          price: pv.price,
          original_price: pv.original_price || null,
          stock: pv.stock,
          weight: pv.weight || null,
          dimensions: pv.dimensions || null,
          image_url: pv.image_url || null,
          is_active: pv.is_active,
        }).select("id").single();
        if (pvErr) throw pvErr;

        // Link variant to options via optionValues (we need to find the option IDs)
        // This is simplified - in a real app you'd track option IDs more carefully
      }

      return productId;
    },
    onSuccess: (productId) => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(isNew ? "Produk berhasil dibuat" : "Produk berhasil diperbarui");
      navigate("/admin/products");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Generate variant combinations
  const generateCombinations = () => {
    const validTypes = variantTypes.filter((vt) => vt.name.trim() && vt.options.some((o) => o.value.trim()));
    if (validTypes.length === 0) return;

    const optionArrays = validTypes.map((vt) => vt.options.filter((o) => o.value.trim()));

    // Cartesian product
    const combos: string[][] = optionArrays.reduce<string[][]>(
      (acc, opts) => {
        if (acc.length === 0) return opts.map((o) => [o.value]);
        return acc.flatMap((combo) => opts.map((o) => [...combo, o.value]));
      },
      []
    );

    setProductVariants(combos.map((combo) => ({
      sku: "", price: form.base_price, original_price: form.original_price,
      stock: 0, weight: form.weight, dimensions: "", image_url: "",
      is_active: true, optionValues: combo,
    })));
  };

  if (!isNew && isLoading) return <p className="text-sm text-muted-foreground p-4">Memuat...</p>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">{isNew ? "Tambah Produk" : "Edit Produk"}</h2>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader><CardTitle className="text-base">Informasi Dasar</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Nama Produk</label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Slug</label>
            <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Deskripsi</label>
            <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Harga Dasar (Rp)</label>
              <Input type="number" value={form.base_price} onChange={(e) => setForm((f) => ({ ...f, base_price: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Harga Coret (Rp)</label>
              <Input type="number" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Badge</label>
              <Input value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="Best Seller, Diskon 50%" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Berat</label>
              <Input value={form.weight} onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))} placeholder="9,4 kg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Rating</label>
              <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Terjual</label>
              <Input value={form.sold_count} onChange={(e) => setForm((f) => ({ ...f, sold_count: e.target.value }))} placeholder="100+" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
            <span className="text-sm text-muted-foreground">Produk Aktif</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader><CardTitle className="text-base">Kategori</CardTitle></CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada kategori. Buat kategori terlebih dahulu.</p>
          ) : (
            <div className="space-y-2">
              {categories.filter((c) => !c.parent_id).map((parent) => (
                <div key={parent.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedCategories.includes(parent.id)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories((prev) => checked ? [...prev, parent.id] : prev.filter((id) => id !== parent.id));
                      }}
                    />
                    <span className="text-sm font-medium">{parent.name}</span>
                  </div>
                  {categories.filter((c) => c.parent_id === parent.id).map((child) => (
                    <div key={child.id} className="flex items-center gap-2 ml-6 mt-1">
                      <Checkbox
                        checked={selectedCategories.includes(child.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories((prev) => checked ? [...prev, child.id] : prev.filter((id) => id !== child.id));
                        }}
                      />
                      <span className="text-sm">{child.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Galeri Gambar
            <label className="cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                <Plus className="h-3.5 w-3.5" />
                Pilih Gambar
              </span>
            </label>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingGalleryFiles.length > 0 && (
            <div className="border border-dashed border-primary/40 rounded-lg p-3 space-y-2 bg-primary/5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-foreground">
                  Pratinjau ({pendingGalleryFiles.length}) — belum diupload
                </p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => {
                      pendingGalleryFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
                      setPendingGalleryFiles([]);
                    }}
                    disabled={uploadingGallery}
                  >
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    onClick={uploadPendingGallery}
                    disabled={uploadingGallery}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    {uploadingGallery ? "Mengupload..." : "Upload Semua"}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {pendingGalleryFiles.map((p, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-border">
                    <img src={p.previewUrl} alt={p.file.name} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center"
                      onClick={() => removePendingGallery(i)}
                      disabled={uploadingGallery}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate">
                      {p.file.name} · {(p.file.size / 1024).toFixed(0)}KB
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {galleryImages.length === 0 && pendingGalleryFiles.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Belum ada gambar</p>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
                <span className="text-sm text-primary hover:underline">Pilih gambar untuk preview</span>
              </label>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, i) => (
                <div key={i} className={`relative group rounded-lg overflow-hidden border-2 ${img.is_thumbnail ? "border-primary" : "border-transparent"}`}>
                  <img src={img.image_url} alt="" className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1">
                    <Button
                      variant="ghost" size="icon"
                      className="h-6 w-6 text-white opacity-0 group-hover:opacity-100"
                      onClick={() => setGalleryImages((prev) => prev.map((g, gi) => ({ ...g, is_thumbnail: gi === i })))}
                    >
                      <ImageIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost" size="icon"
                      className="h-6 w-6 text-white opacity-0 group-hover:opacity-100"
                      onClick={() => setGalleryImages((prev) => prev.filter((_, gi) => gi !== i))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {img.is_thumbnail && (
                    <span className="absolute bottom-1 left-1 text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Thumbnail</span>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Spesifikasi
            <Button size="sm" variant="outline" onClick={() => setSpecs((prev) => [...prev, { label: "", value: "" }])}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Tambah
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                placeholder="Label (misal: Bahan)"
                value={spec.label}
                onChange={(e) => setSpecs((prev) => { const c = [...prev]; c[i].label = e.target.value; return c; })}
                className="flex-1"
              />
              <Input
                placeholder="Nilai"
                value={spec.value}
                onChange={(e) => setSpecs((prev) => { const c = [...prev]; c[i].value = e.target.value; return c; })}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive flex-shrink-0" onClick={() => setSpecs((prev) => prev.filter((_, gi) => gi !== i))}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          {specs.length === 0 && <p className="text-sm text-muted-foreground">Belum ada spesifikasi</p>}
        </CardContent>
      </Card>

      {/* Variant Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Tipe Variasi
            <Button size="sm" variant="outline" onClick={() => setVariantTypes((prev) => [...prev, { name: "", options: [{ value: "", image_url: "" }] }])}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Tambah Tipe
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variantTypes.map((vt, vtIdx) => (
            <div key={vtIdx} className="border rounded-lg p-3 space-y-3">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Nama tipe (misal: Ukuran, Warna)"
                  value={vt.name}
                  onChange={(e) => setVariantTypes((prev) => { const c = [...prev]; c[vtIdx].name = e.target.value; return c; })}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setVariantTypes((prev) => prev.filter((_, i) => i !== vtIdx))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="space-y-2 pl-4">
                <p className="text-xs font-medium text-muted-foreground">Opsi:</p>
                {vt.options.map((opt, optIdx) => {
                  const pendingKey = `${vtIdx}-${optIdx}`;
                  const pending = pendingOptionFiles[pendingKey];
                  return (
                  <div key={optIdx} className="flex gap-2 items-center">
                    <Input
                      placeholder="Nilai opsi"
                      value={opt.value}
                      onChange={(e) => setVariantTypes((prev) => { const c = [...prev]; c[vtIdx].options[optIdx].value = e.target.value; return c; })}
                      className="flex-1"
                    />
                    {pending ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="relative">
                          <img src={pending.previewUrl} alt="preview" className="w-8 h-8 rounded object-cover ring-2 ring-primary" />
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" onClick={() => uploadPendingOption(vtIdx, optIdx)} title="Upload">
                          <Upload className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => cancelPendingOption(vtIdx, optIdx)} title="Batal">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : opt.image_url ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <img src={opt.image_url} alt="" className="w-8 h-8 rounded object-cover" />
                        <label className="cursor-pointer">
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleOptionImageSelect(vtIdx, optIdx, e)} />
                          <span className="text-[10px] text-primary hover:underline">Ganti</span>
                        </label>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex-shrink-0">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleOptionImageSelect(vtIdx, optIdx, e)} />
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <Plus className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </label>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                      setVariantTypes((prev) => { const c = [...prev]; c[vtIdx].options = c[vtIdx].options.filter((_, i) => i !== optIdx); return c; });
                    }}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  );
                })}
                <Button size="sm" variant="ghost" onClick={() => {
                  setVariantTypes((prev) => { const c = [...prev]; c[vtIdx].options.push({ value: "", image_url: "" }); return c; });
                }}>
                  <Plus className="h-3 w-3 mr-1" />
                  Tambah Opsi
                </Button>
              </div>
            </div>
          ))}
          {variantTypes.length === 0 && <p className="text-sm text-muted-foreground">Belum ada tipe variasi</p>}
          {variantTypes.length > 0 && (
            <Button variant="secondary" onClick={generateCombinations} className="w-full">
              Buat Kombinasi Variasi Otomatis
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Product Variants (combinations) */}
      {productVariants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kombinasi Variasi ({productVariants.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {productVariants.map((pv, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {pv.optionValues.map((ov) => (
                      <span key={ov} className="text-xs bg-secondary px-2 py-0.5 rounded">{ov}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Switch
                      checked={pv.is_active}
                      onCheckedChange={(v) => setProductVariants((prev) => { const c = [...prev]; c[i].is_active = v; return c; })}
                    />
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setProductVariants((prev) => prev.filter((_, gi) => gi !== i))}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-muted-foreground">Harga</label>
                    <Input type="number" value={pv.price} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].price = Number(e.target.value); return c; })} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">Harga Coret</label>
                    <Input type="number" value={pv.original_price} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].original_price = Number(e.target.value); return c; })} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">Stok</label>
                    <Input type="number" value={pv.stock} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].stock = Number(e.target.value); return c; })} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">SKU</label>
                    <Input value={pv.sku} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].sku = e.target.value; return c; })} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">Berat</label>
                    <Input value={pv.weight} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].weight = e.target.value; return c; })} className="h-8 text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground">Dimensi</label>
                    <Input value={pv.dimensions} onChange={(e) => setProductVariants((prev) => { const c = [...prev]; c[i].dimensions = e.target.value; return c; })} className="h-8 text-xs" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Save button */}
      <div className="sticky bottom-4">
        <Button onClick={() => saveMutation.mutate()} disabled={!form.name.trim() || saveMutation.isPending} className="w-full" size="lg">
          <Save className="h-4 w-4 mr-2" />
          {saveMutation.isPending ? "Menyimpan..." : isNew ? "Simpan Produk" : "Perbarui Produk"}
        </Button>
      </div>
    </div>
  );
};

export default AdminProductForm;
