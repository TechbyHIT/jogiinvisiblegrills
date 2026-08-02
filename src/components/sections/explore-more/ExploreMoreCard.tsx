import Link from "next/link";
import type { ExploreMoreCard as ExploreMoreCardType } from "@/lib/internal-links/explore-more-types";
import { ExploreMoreIcon } from "@/components/sections/explore-more/ExploreMoreIcon";
import styles from "@/components/sections/explore-more/explore-more.module.css";

type ExploreMoreCardProps = {
  card: ExploreMoreCardType;
  /** When true, links render in accordion panel (no outer article wrapper). */
  embedded?: boolean;
};

function cardClassName(variant?: ExploreMoreCardType["variant"]) {
  const parts = [styles.card];
  if (variant === "accent") parts.push(styles.cardAccent);
  if (variant === "highlight") parts.push(styles.cardHighlight);
  if (variant === "cta") parts.push(styles.cardCta);
  return parts.join(" ");
}

export function ExploreMoreCardBody({ card }: ExploreMoreCardProps) {
  return (
    <>
      <div className={styles.cardHead}>
        <div className={styles.iconWrap}>
          <ExploreMoreIcon id={card.icon} />
        </div>
        <div>
          <h3 className={styles.cardTitle} id={`explore-${card.id}-title`}>
            {card.title}
          </h3>
          <p className={styles.cardDesc}>{card.description}</p>
        </div>
      </div>
      <ul className={styles.linkList} aria-labelledby={`explore-${card.id}-title`}>
        {card.links.map((link) => (
          <li key={link.href} className={styles.linkItem}>
            <Link
              href={link.href}
              className={`${styles.link} ${link.isCurrent ? styles.linkCurrent : ""}`}
              {...(link.isCurrent ? { "aria-current": "page" as const } : {})}
              {...(link.rel ? { rel: link.rel } : {})}
            >
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {card.viewAllHref && card.viewAllLabel && (
        <div className={styles.footer}>
          <Link href={card.viewAllHref} className={styles.viewAll}>
            {card.viewAllLabel}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </>
  );
}

export function ExploreMoreCard({ card, embedded }: ExploreMoreCardProps) {
  if (embedded) {
    return <ExploreMoreCardBody card={card} />;
  }

  return (
    <article className={cardClassName(card.variant)} aria-labelledby={`explore-${card.id}-title`}>
      <ExploreMoreCardBody card={card} />
    </article>
  );
}
