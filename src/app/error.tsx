"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <Heading level={1}>Something went wrong</Heading>
      <p className="mt-4 text-text-muted max-w-md mx-auto">
        We encountered an unexpected error. Please try again or contact us directly.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/contact/" variant="outline">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
