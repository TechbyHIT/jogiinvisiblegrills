"use client";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        <Container className="py-24 text-center">
          <Heading level={1}>Application Error</Heading>
          <p className="mt-4 text-text-muted">
            A critical error occurred. Please refresh the page.
          </p>
          <Button onClick={reset} variant="primary" className="mt-8">
            Try again
          </Button>
        </Container>
      </body>
    </html>
  );
}
