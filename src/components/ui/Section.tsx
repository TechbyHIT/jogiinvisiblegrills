import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "muted" | "primary";
  containerClassName?: string;
};

const variantClasses = {
  default: "bg-white",
  muted: "bg-surface",
  primary: "bg-primary text-text-inverse",
};

export function Section({
  children,
  id,
  className = "",
  variant = "default",
  containerClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 ${variantClasses[variant]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
