import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-accent font-semibold text-sm uppercase tracking-wider">404</p>
      <Heading level={1} className="mt-2">
        Page not found
      </Heading>
      <p className="mt-4 text-text-muted max-w-md mx-auto">
        The page you are looking for may have moved or does not exist.
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <Button href="/" variant="primary">
          Go home
        </Button>
        <Button href="/services/" variant="outline">
          Browse services
        </Button>
        <Link href="/contact/" className="text-sm text-primary hover:text-accent self-center">
          Contact us
        </Link>
      </div>
    </Container>
  );
}
