import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/config/business";
import { Container } from "@/components/ui/Container";
import { TopBar } from "@/components/layout/TopBar";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";

export function Header() {
  const logoWidth = BUSINESS_CONFIG.logoWidth ?? 220;
  const logoHeight = BUSINESS_CONFIG.logoHeight ?? 56;

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md">
      <TopBar />
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center shrink-0 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded-sm"
          aria-label={`${BUSINESS_CONFIG.name} — home`}
        >
          <Image
            src={BUSINESS_CONFIG.logo}
            alt={`${BUSINESS_CONFIG.name} logo`}
            width={logoWidth}
            height={logoHeight}
            priority
            className="h-10 w-auto max-w-[min(220px,52vw)] object-contain object-left sm:h-12 sm:max-w-[220px] transition-opacity group-hover:opacity-90"
          />
        </Link>
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
