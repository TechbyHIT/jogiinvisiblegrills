import { Heading } from "@/components/ui/Heading";

type ServiceApplicationsGridProps = {
  title: string;
  items: string[];
};

/** Featherguard-style two-column applications / features grid with checkmarks. */
export function ServiceApplicationsGrid({ title, items }: ServiceApplicationsGridProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <Heading level={2} className="text-primary mb-5 text-xl sm:text-2xl">
        {title}
      </Heading>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-muted"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
