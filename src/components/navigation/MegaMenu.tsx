"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MegaMenuConfig } from "@/config/mega-menu";

type MegaMenuProps = {
  label: string;
  menu: MegaMenuConfig;
  href: string;
};

export function MegaMenu({ label, menu, href }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-text hover:text-primary transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-1 w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-border bg-white shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {menu.columns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-5">
                {column.sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-bold text-primary mb-3 pb-2 border-b border-border">
                      {section.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {section.links.map((link) => (
                        <li key={`${section.title}-${link.label}`}>
                          <Link
                            href={link.href}
                            className="block text-sm text-text-muted hover:text-gold transition-colors py-0.5"
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-b-xl bg-surface-alt px-6 py-3 border-t border-border">
            <span className="text-sm text-text-muted">{menu.footerText}</span>
            <Link
              href={menu.footerHref}
              className="text-sm font-semibold text-gold hover:text-gold-hover transition-colors"
              onClick={() => setOpen(false)}
            >
              {menu.footerLabel}
            </Link>
          </div>
        </div>
      )}

      <Link href={href} className="sr-only">
        View all {label.toLowerCase()}
      </Link>
    </div>
  );
}
