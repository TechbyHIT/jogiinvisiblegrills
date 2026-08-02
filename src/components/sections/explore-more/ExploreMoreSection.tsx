"use client";

import { useCallback, useId, useMemo, useState } from "react";
import Link from "next/link";
import type { ExploreMoreCard as ExploreMoreCardType } from "@/lib/internal-links/explore-more-types";
import { ExploreMoreCard, ExploreMoreCardBody } from "@/components/sections/explore-more/ExploreMoreCard";
import { ExploreMoreIcon } from "@/components/sections/explore-more/ExploreMoreIcon";
import styles from "@/components/sections/explore-more/explore-more.module.css";

export type ExploreMoreSectionProps = {
  cards: ExploreMoreCardType[];
  title?: string;
  description?: string;
  /** Optional sticky mobile CTA (contact). */
  showMobileStickyCta?: boolean;
};

export function ExploreMoreSection({
  cards,
  title = "Explore more",
  description = "Contextual paths across services, localities, guides, pricing and support — tailored to this page.",
  showMobileStickyCta = true,
}: ExploreMoreSectionProps) {
  const sectionId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const ctaCard = useMemo(
    () => cards.find((c) => c.id === "book-inspection" || c.variant === "cta"),
    [cards],
  );

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (cards.length === 0) return null;

  return (
    <section
      className={styles.explore}
      aria-labelledby={`${sectionId}-heading`}
      id="explore-more"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Related pages</p>
          <h2 className={styles.title} id={`${sectionId}-heading`}>
            {title}
          </h2>
          <p className={styles.lead}>{description}</p>
        </header>

        <nav className={styles.gridDesktop} aria-label="Explore related pages">
          <div className={styles.grid}>
            {cards.map((card) => (
              <ExploreMoreCard key={card.id} card={card} />
            ))}
          </div>
        </nav>

        <div className={styles.accordionList} aria-label="Explore related pages">
          {cards.map((card) => {
            const isOpen = openIds.has(card.id);
            const panelId = `${sectionId}-panel-${card.id}`;
            return (
              <div key={card.id}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={`${sectionId}-trigger-${card.id}`}
                  onClick={() => toggle(card.id)}
                >
                  <span className={styles.cardHead}>
                    <span className={styles.iconWrap}>
                      <ExploreMoreIcon id={card.icon} />
                    </span>
                    <span>
                      <span className={styles.cardTitle}>{card.title}</span>
                      <span className={styles.cardDesc}>{card.description}</span>
                    </span>
                  </span>
                  <span
                    className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ""}`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`${sectionId}-trigger-${card.id}`}
                    className={styles.accordionPanel}
                  >
                    <div className={styles.accordionPanelInner}>
                      <ExploreMoreCardBody card={card} embedded />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showMobileStickyCta && ctaCard?.viewAllHref && (
          <div className={styles.stickyCta}>
            <div>
              <strong>{ctaCard.title}</strong>
              <p className={styles.cardDesc} style={{ margin: 0 }}>
                {ctaCard.description}
              </p>
            </div>
            <Link href={ctaCard.viewAllHref} className={styles.viewAll}>
              {ctaCard.viewAllLabel ?? "Book now"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
