import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-24">
      <div className="animate-pulse space-y-4 max-w-2xl">
        <div className="h-8 bg-surface-alt rounded w-3/4" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-5/6" />
        <div className="h-4 bg-surface-alt rounded w-2/3" />
      </div>
    </Container>
  );
}
