import type { ReactNode } from "react";
import type { ExploreMoreIconId } from "@/lib/internal-links/explore-more-types";

type IconProps = {
  id: ExploreMoreIconId;
  className?: string;
};

const paths: Record<ExploreMoreIconId, ReactNode> = {
  service: (
    <path
      fill="currentColor"
      d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2H4V6zm0 4h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z"
    />
  ),
  related: (
    <path
      fill="currentColor"
      d="M7 7h4v4H7V7zm6 0h4v4h-4V7zM7 13h4v4H7v-4zm6 0h4v4h-4v-4z"
    />
  ),
  "map-pin": (
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"
    />
  ),
  city: (
    <path
      fill="currentColor"
      d="M3 21V9l9-4 9 4v12H3zm4-2h2v-5H7v5zm4 0h2v-8h-2v8zm4 0h2v-3h-2v3z"
    />
  ),
  district: (
    <path fill="currentColor" d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z" />
  ),
  state: (
    <path
      fill="currentColor"
      d="M12 2l7 4v12l-7 4-7-4V6l7-4zm0 3.2L7 8.5v7L12 19l5-3.5v-7L12 5.2z"
    />
  ),
  search: (
    <path
      fill="currentColor"
      d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
    />
  ),
  price: (
    <path
      fill="currentColor"
      d="M7 4h10a2 2 0 012 2v1H5V6a2 2 0 012-2zm-2 6h14v2H5v-2zm2 4h10v6H7v-6z"
    />
  ),
  guide: (
    <path
      fill="currentColor"
      d="M6 2h12a2 2 0 012 2v16l-8-3-8 3V4a2 2 0 012-2z"
    />
  ),
  install: (
    <path
      fill="currentColor"
      d="M11 2h2v5h5v2h-5v5h-2V9H6V7h5V2zm-5 12h12v2H6v-2z"
    />
  ),
  applications: (
    <path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
  ),
  building: (
    <path
      fill="currentColor"
      d="M4 21V8l8-4 8 4v13H4zm4-2h2v-4H8v4zm4 0h2v-6h-2v6zm4 0h2v-3h-2v3z"
    />
  ),
  materials: (
    <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zm0 8L4 7v10l8 4 8-4V7l-8 3z" />
  ),
  maintenance: (
    <path
      fill="currentColor"
      d="M12 8a4 4 0 014 4v1h2v7H6v-7h2v-1a4 4 0 014-4zm0 2a2 2 0 00-2 2v1h4v-1a2 2 0 00-2-2z"
    />
  ),
  repair: (
    <path
      fill="currentColor"
      d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
    />
  ),
  faq: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  ),
  projects: (
    <path fill="currentColor" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
  ),
  gallery: (
    <path
      fill="currentColor"
      d="M4 4h16v12H4V4zm2 2v8h12V6H6zm2 2h8l-2 3-2-2-2 3V8z"
    />
  ),
  blog: (
    <path fill="currentColor" d="M19 3H5a2 2 0 00-2 2v14l4-2 4 2 4-2 4 2V5a2 2 0 00-2-2z" />
  ),
  landmark: (
    <path fill="currentColor" d="M12 2l4 8h5l-4 6 1 6-6-3-6 3 1-6-4-6h5l4-8z" />
  ),
  apartment: (
    <path
      fill="currentColor"
      d="M3 21V9l9-5 9 5v12H3zm6-2h2v-4H9v4zm4 0h2v-6h-2v6zm4 0h2v-3h-2v3z"
    />
  ),
  commercial: (
    <path fill="currentColor" d="M2 21V3h9v18H2zm11 0V8h9v13h-9z" />
  ),
  "it-park": (
    <path fill="currentColor" d="M4 21V3h16v18H4zm4-2h2v-4H8v4zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z" />
  ),
  products: (
    <path fill="currentColor" d="M12 2l8 4v12l-8 4-8-4V6l8-4zm0 3.5L6.5 8 12 10.5 17.5 8 12 5.5z" />
  ),
  reviews: (
    <path
      fill="currentColor"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
    />
  ),
  contact: (
    <path
      fill="currentColor"
      d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  ),
  inspection: (
    <path
      fill="currentColor"
      d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zM19 3H5a2 2 0 00-2 2v14l4-2 4 2 4-2 4 2V5a2 2 0 00-2-2z"
    />
  ),
};

export function ExploreMoreIcon({ id, className }: IconProps) {
  return (
    <svg
      className={className}
      width={22}
      height={22}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {paths[id]}
    </svg>
  );
}
