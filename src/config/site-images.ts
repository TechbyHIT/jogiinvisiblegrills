import { getDefaultOpenGraphImage, getSiteGalleryImages } from "@/config/finalized-images";

/** Public image paths — real HD photos from finalized project folders. */
export const SITE_IMAGES = {
  get homeHero() {
    return getDefaultOpenGraphImage();
  },
  get openGraph() {
    return getDefaultOpenGraphImage();
  },
  get gallery() {
    return getSiteGalleryImages(12);
  },
  get areaDefault() {
    return getSiteGalleryImages(3);
  },
} as const;

/** Legacy map — runtime resolution uses finalized-images helpers instead. */
export const SERVICE_IMAGE_MAP: Record<string, { heroImage: string; galleryImages: string[] }> =
  {};
