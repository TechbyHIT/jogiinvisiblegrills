import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getGalleryPageImages, getHeroForService } from "@/config/finalized-images";
import { Hero } from "@/components/sections/Hero";
import { InstallationGallery } from "@/components/sections/InstallationGallery";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/gallery/");
  return page ? generatePageMetadata(page) : { title: "Project Gallery" };
}

export default function GalleryPage() {
  const galleryImages = getGalleryPageImages(6);
  const heroImage = getHeroForService("invisible-grills", "invisible-grills", 5);

  return (
    <>
      <Hero
        title="Project Gallery"
        subtitle="Real HD installation photos across Bengaluru and Mysuru — invisible grills, safety nets, pigeon nets, sports nets and more."
        image={heroImage}
        imageAlt="Invisible grill installation — Jogendhra Enterprises project gallery"
      />
      <InstallationGallery
        images={galleryImages}
        maxImages={galleryImages.length}
        title="Recent installations"
        subtitle="Browse real project photos from every service category — balconies, windows, terraces, ducts and commercial sites."
      />
      <CTABanner
        title="Want results like these for your home?"
        primaryLabel="Get Free Site Inspection"
      />
    </>
  );
}
