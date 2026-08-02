import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedAreas } from "@/data/initial-areas";
import { getHomeHeroImage } from "@/config/finalized-images";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CityAreaGrid } from "@/components/sections/CityAreaGrid";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/locations/");
  return page ? generatePageMetadata(page) : { title: "Service Locations" };
}

export default function LocationsPage() {
  const locations = getPublishedLocations().filter((l) => l.isServed);
  const areas = getPublishedAreas().filter((a) => a.isServed);

  const hubCities = ["bangalore", "mysore"]
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean);

  return (
    <>
      <Hero
        title="Service Locations"
        subtitle="Browse city hubs and locality pages across Bengaluru and Mysuru."
        image={getHomeHeroImage()}
        imageAlt="Invisible grill and safety net installations across Karnataka"
        fullBleed
        primaryCta={{ label: "Get Free Assessment", href: "/contact/" }}
      />
      <Section>
        <Heading level={2} className="text-primary mb-8">
          City Hubs & Localities
        </Heading>
        <div className="space-y-8">
          {hubCities.map((location) => {
            const cityAreas = areas.filter((a) => a.locationId === location!.id);
            return (
              <CityAreaGrid
                key={location!.id}
                location={location!}
                areas={cityAreas}
              />
            );
          })}
        </div>
      </Section>
      <CorePageContent path="/locations/" />
      <CTABanner />
    </>
  );
}
