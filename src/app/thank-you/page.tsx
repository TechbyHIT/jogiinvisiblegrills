import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/thank-you/");
  return page ? generatePageMetadata(page) : { title: "Thank You", robots: { index: false, follow: false } };
}

export default function ThankYouPage() {
  return (
    <Container className="py-24 text-center">
      <div className="mx-auto max-w-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent text-2xl font-bold" aria-hidden="true">
          ✓
        </div>
        <Heading level={1} className="mt-6 text-primary">
          Thank You!
        </Heading>
        <p className="mt-4 text-text-muted">
          We have received your enquiry. Our team will contact you shortly at the number you provided.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} variant="outline" external>
            Call {BUSINESS_CONFIG.phone.display}
          </Button>
        </div>
      </div>
    </Container>
  );
}
