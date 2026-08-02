import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "gold" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-primary-dark hover:bg-gold-hover focus-visible:ring-gold font-bold",
  gold:
    "bg-gold text-primary-dark hover:bg-gold-hover focus-visible:ring-gold font-bold",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-hover focus-visible:ring-whatsapp",
  secondary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
  "outline-light":
    "border-2 border-white/80 text-white hover:bg-white hover:text-primary focus-visible:ring-white",
  ghost: "text-primary hover:bg-surface-alt focus-visible:ring-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
