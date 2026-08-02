/** Search intents for flat programmatic URLs — all indexable for sitemap coverage. */
export type SearchIntent = {
  slug: string;
  label: string;
  allowIndexing: boolean;
};

/**
 * ~25 high-intent modifiers (price, near me, best, premium, etc.).
 * Sorted longest-first when matching URL suffixes in the slug parser.
 */
export const SEARCH_INTENTS: SearchIntent[] = [
  { slug: "near-me", label: "Near Me", allowIndexing: true },
  { slug: "installation", label: "Installation", allowIndexing: true },
  { slug: "maintenance", label: "Maintenance", allowIndexing: true },
  { slug: "manufacturers", label: "Manufacturers", allowIndexing: true },
  { slug: "contractors", label: "Contractors", allowIndexing: true },
  { slug: "residential", label: "Residential", allowIndexing: true },
  { slug: "commercial", label: "Commercial", allowIndexing: true },
  { slug: "suppliers", label: "Suppliers", allowIndexing: true },
  { slug: "dealers", label: "Dealers", allowIndexing: true },
  { slug: "services", label: "Services", allowIndexing: true },
  { slug: "premium", label: "Premium", allowIndexing: true },
  { slug: "company", label: "Company", allowIndexing: true },
  { slug: "quotes", label: "Quotes", allowIndexing: true },
  { slug: "charges", label: "Charges", allowIndexing: true },
  { slug: "repair", label: "Repair", allowIndexing: true },
  { slug: "rates", label: "Rates", allowIndexing: true },
  { slug: "price", label: "Price", allowIndexing: true },
  { slug: "cost", label: "Cost", allowIndexing: true },
  { slug: "best", label: "Best", allowIndexing: true },
  { slug: "top", label: "Top", allowIndexing: true },
  { slug: "hire", label: "Hire", allowIndexing: true },
  { slug: "buy", label: "Buy", allowIndexing: true },
  { slug: "sale", label: "Sale", allowIndexing: true },
  { slug: "offer", label: "Offer", allowIndexing: true },
  { slug: "shop", label: "Shop", allowIndexing: true },
];

export const INDEXABLE_INTENTS = SEARCH_INTENTS.filter((i) => i.allowIndexing);

export function getSearchIntentBySlug(slug: string) {
  return SEARCH_INTENTS.find((i) => i.slug === slug);
}

export function getIntentSlugsSortedByLength(): string[] {
  return [...SEARCH_INTENTS].sort((a, b) => b.slug.length - a.slug.length).map((i) => i.slug);
}
