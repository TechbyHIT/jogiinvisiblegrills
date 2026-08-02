"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BUSINESS_CONFIG } from "@/config/business";
import { getAreasMegaMenu, getServicesMegaMenu } from "@/config/mega-menu";
import { Button } from "@/components/ui/Button";

const SIMPLE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
] as const;

type MenuLink = { href: string; label: string };

function uniqueMenuLinks(links: MenuLink[], limit = 8): MenuLink[] {
  const seen = new Set<string>();
  const unique: MenuLink[] = [];
  for (const link of links) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    unique.push(link);
    if (unique.length >= limit) break;
  }
  return unique;
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const servicesMenu = getServicesMegaMenu();
  const areasMenu = getAreasMegaMenu();
  const serviceLinks = uniqueMenuLinks(
    servicesMenu.columns.flatMap((col) => col.sections.flatMap((section) => section.links)),
    8,
  );
  const areaLinks = uniqueMenuLinks(
    areasMenu.columns.flatMap((col) => col.sections.flatMap((section) => section.links)),
    8,
  );
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp.raw.replace(/\D/g, "")}`;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-md p-2 text-text hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" onClick={() => setOpen(false)} />
          <nav
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-white">
              <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
                <Image
                  src={BUSINESS_CONFIG.logo}
                  alt={BUSINESS_CONFIG.name}
                  width={BUSINESS_CONFIG.logoWidth ?? 220}
                  height={BUSINESS_CONFIG.logoHeight ?? 56}
                  className="h-9 w-auto max-w-[200px] object-contain object-left"
                />
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-2 text-primary hover:bg-surface-alt" aria-label="Close menu">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="px-4 py-4 space-y-1">
              {SIMPLE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-text hover:bg-surface-alt hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-4 pb-2">
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-muted">Services</p>
              <ul className="space-y-1">
                {serviceLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-text-muted hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services/" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gold">
                    View all services →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="px-4 pb-4">
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-muted">Areas</p>
              <ul className="space-y-1">
                {areaLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-text-muted hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/locations/" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gold">
                    View all areas →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-border p-4 space-y-3 bg-surface-alt">
              <Button href={whatsappUrl} variant="whatsapp" className="w-full" external>
                WhatsApp Now
              </Button>
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} variant="gold" className="w-full" external>
                Call Now
              </Button>
              <Button href="/contact/" variant="secondary" className="w-full">
                Get Free Quote
              </Button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
