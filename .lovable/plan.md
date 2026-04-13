

## Plan: Differentiate Size Variant Images

### Problem
Currently, every size variant within a product uses the exact same image (`productMainImages["X"]`). This makes it impossible for users to visually distinguish between sizes.

### Solution
Generate unique size-specific product images for each size variant across all 34 products. Each image will visually represent the different size (e.g., a 1-seater sofa vs a 3-seater sofa).

### Steps

1. **Generate size-specific images** -- Create unique AI-generated images for each size variant. For products with 2-4 size variants, this means ~80-100 new images total. Each image will depict the product at the correct proportions for that size. Files will be saved as `src/assets/products/sizes/{productId}-size-{index}.jpg`.

2. **Create size image mapping** -- Add a new export in `src/data/productImages.ts` that maps product IDs to arrays of size-specific images:
   ```ts
   export const productSizeImages: Record<string, string[]> = {
     "1": [sofabed1Size90, sofabed1Size135, sofabed1Size150, sofabed1Size180],
     ...
   };
   ```

3. **Update product data** -- Modify `src/data/products.ts` to assign each `sizeVariant.image` from the new size image mapping instead of repeating the main product image.

4. **Build verification** -- Run build to confirm all imports resolve correctly.

### Technical Details
- Images will be generated as 800x600 JPEG at ~80% quality to keep bundle size reasonable
- For the 10 real Tokopedia products (IDs 1-11), we'll use variations of existing real photos (color variants, different angles) where available, and generate complementary images where not
- For the 24 generated products (IDs 12-34), all size images will be AI-generated with size-appropriate visuals

