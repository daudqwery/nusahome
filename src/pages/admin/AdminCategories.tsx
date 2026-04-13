import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"categories">;

const AdminCategories = () => {
  const qc = useQueryClient();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", parent_id: "", is_active: true });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        parent_id: form.parent_id || null,
        is_active: form.is_active,
      };
      if (editId) {
        const { error } = await supabase.from("categories").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      resetForm();
      toast.success(editId ? "Kategori diperbarui" : "Kategori ditambahkan");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Kategori dihapus");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => {
    setEditId(null);
    setForm({ name: "", slug: "", parent_id: "", is_active: true });
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setForm({ name: cat.name, slug: cat.slug, parent_id: cat.parent_id || "", is_active: cat.is_active });
  };

  const parentCategories = categories.filter((c) => !c.parent_id && c.id !== editId);

  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || "";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Manajemen Kategori</h2>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{editId ? "Edit Kategori" : "Tambah Kategori"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Nama kategori"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))}
          />
          <Input
            placeholder="Slug (otomatis)"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          />
          <Select value={form.parent_id} onValueChange={(v) => setForm((f) => ({ ...f, parent_id: v === "none" ? "" : v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori induk (opsional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Tidak ada (root)</SelectItem>
              {parentCategories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
            <span className="text-sm text-muted-foreground">Aktif</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => saveMutation.mutate()} disabled={!form.name.trim() || saveMutation.isPending}>
              <Save className="h-4 w-4 mr-1" />
              {editId ? "Simpan" : "Tambah"}
            </Button>
            {editId && (
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-1" />
                Batal
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada kategori</p>
          ) : (
            <div className="space-y-2">
              {categories.filter((c) => !c.parent_id).map((parent) => (
                <div key={parent.id}>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${!parent.is_active ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {parent.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">/{parent.slug}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(parent)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(parent.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  {/* Children */}
                  {categories.filter((c) => c.parent_id === parent.id).map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-2 pl-8 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">└</span>
                        <span className={`text-sm ${!child.is_active ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {child.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">/{child.slug}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(child)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(child.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
