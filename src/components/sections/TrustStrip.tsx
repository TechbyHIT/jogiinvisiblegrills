import { BUSINESS_CONFIG } from "@/config/business";

const TRUST_ITEMS = [
  "Certified Installation",
  "Warranty Support",
  "Premium Materials",
  "Fast Installation",
  "Affordable Pricing",
  "Free Inspection",
];

export function TrustStrip() {
  return (
    <section className="bg-primary-dark py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium text-white"
            >
              <svg className="h-3.5 w-3.5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs text-slate-400">
          {BUSINESS_CONFIG.name} &mdash; professional home safety installations
        </p>
      </div>
    </section>
  );
}
