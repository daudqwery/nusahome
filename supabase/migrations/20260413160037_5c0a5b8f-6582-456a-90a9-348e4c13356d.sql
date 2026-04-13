-- CATEGORIES (hierarchical parent/child)
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCTS
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  base_price BIGINT NOT NULL DEFAULT 0,
  original_price BIGINT,
  badge TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight TEXT,
  sold_count TEXT,
  rating NUMERIC(2,1),
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCT_CATEGORIES (many-to-many)
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  UNIQUE(product_id, category_id)
);

ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product categories are viewable by everyone" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage product categories" ON public.product_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCT_IMAGES (gallery)
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_thumbnail BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product images are viewable by everyone" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage product images" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCT_SPECIFICATIONS (key-value)
CREATE TABLE public.product_specifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Specs are viewable by everyone" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage specs" ON public.product_specifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- VARIANT_TYPES (e.g. "Ukuran", "Warna")
CREATE TABLE public.variant_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.variant_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variant types are viewable by everyone" ON public.variant_types FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage variant types" ON public.variant_types FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- VARIANT_OPTIONS (values per type)
CREATE TABLE public.variant_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_type_id UUID NOT NULL REFERENCES public.variant_types(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE public.variant_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variant options are viewable by everyone" ON public.variant_options FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage variant options" ON public.variant_options FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCT_VARIANTS (combinations with price/stock)
CREATE TABLE public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT,
  price BIGINT NOT NULL DEFAULT 0,
  original_price BIGINT,
  stock INT NOT NULL DEFAULT 0,
  weight TEXT,
  dimensions TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variants are viewable by everyone" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage variants" ON public.product_variants FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- PRODUCT_VARIANT_VALUES (links variant to options)
CREATE TABLE public.product_variant_values (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES public.variant_options(id) ON DELETE CASCADE,
  UNIQUE(variant_id, option_id)
);

ALTER TABLE public.product_variant_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variant values are viewable by everyone" ON public.product_variant_values FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage variant values" ON public.product_variant_values FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STORAGE BUCKET for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

CREATE POLICY "Product images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- INDEXES
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_product_categories_product ON public.product_categories(product_id);
CREATE INDEX idx_product_categories_category ON public.product_categories(category_id);
CREATE INDEX idx_product_images_product ON public.product_images(product_id);
CREATE INDEX idx_product_specs_product ON public.product_specifications(product_id);
CREATE INDEX idx_variant_types_product ON public.variant_types(product_id);
CREATE INDEX idx_variant_options_type ON public.variant_options(variant_type_id);
CREATE INDEX idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX idx_variant_values_variant ON public.product_variant_values(variant_id);
CREATE INDEX idx_variant_values_option ON public.product_variant_values(option_id);