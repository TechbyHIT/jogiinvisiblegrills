import { createElement, type ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = {
  children: ReactNode;
  level?: HeadingLevel;
  className?: string;
};

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15]",
  2: "text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-snug",
  3: "text-xl font-semibold leading-snug",
  4: "text-lg font-semibold leading-snug",
};

export function Heading({ children, level = 2, className = "" }: HeadingProps) {
  return createElement(
    `h${level}`,
    {
      className: `${levelClasses[level]} text-text ${className}`,
    },
    children,
  );
}
