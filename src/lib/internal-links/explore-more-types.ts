import type { InternalLink } from "@/types";

export type ExploreMoreLink = InternalLink & {
  /** Marks the active page for accessibility and visual highlight */
  isCurrent?: boolean;
};

export type ExploreMoreCardVariant = "default" | "accent" | "cta" | "highlight";

export type ExploreMoreCard = {
  id: string;
  title: string;
  description: string;
  icon: ExploreMoreIconId;
  links: ExploreMoreLink[];
  viewAllHref?: string;
  viewAllLabel?: string;
  variant?: ExploreMoreCardVariant;
};

export type ExploreMoreIconId =
  | "service"
  | "related"
  | "map-pin"
  | "city"
  | "district"
  | "state"
  | "search"
  | "price"
  | "guide"
  | "install"
  | "applications"
  | "building"
  | "materials"
  | "maintenance"
  | "repair"
  | "faq"
  | "projects"
  | "gallery"
  | "blog"
  | "landmark"
  | "apartment"
  | "commercial"
  | "it-park"
  | "products"
  | "reviews"
  | "contact"
  | "inspection";
