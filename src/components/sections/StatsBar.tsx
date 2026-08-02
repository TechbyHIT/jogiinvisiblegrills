import { TRUST_STATS } from "@/config/trust-content";

export function StatsBar() {
  return (
    <section className="bg-primary py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST_STATS.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gold md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-300 md:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
