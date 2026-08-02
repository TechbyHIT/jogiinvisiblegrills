type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] text-gold mb-3 ${className}`}
    >
      {children}
    </p>
  );
}
