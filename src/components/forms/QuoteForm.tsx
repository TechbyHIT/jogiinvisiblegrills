"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { getPublishedServices } from "@/data/initial-services";

type QuoteFormProps = {
  defaultServiceSlug?: string;
};

export function QuoteForm({ defaultServiceSlug }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const services = getPublishedServices();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/quote/", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      window.location.href = "/thank-you/";
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or call us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="block text-sm font-medium mb-1">Name *</label>
          <input id="quote-name" name="name" required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-sm font-medium mb-1">Mobile *</label>
          <input id="quote-phone" name="phone" type="tel" required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div>
        <label htmlFor="quote-locality" className="block text-sm font-medium mb-1">Locality *</label>
        <input id="quote-locality" name="locality" required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <div>
        <label htmlFor="quote-service" className="block text-sm font-medium mb-1">Service</label>
        <select id="quote-service" name="serviceSlug" defaultValue={defaultServiceSlug ?? ""} className="w-full rounded-md border border-border px-4 py-2.5 bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
          <option value="">Select service</option>
          {services.map((s) => (
            <option key={s.id} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quote-dimensions" className="block text-sm font-medium mb-1">Approx. dimensions</label>
        <input id="quote-dimensions" name="dimensions" placeholder="e.g. 10 ft x 4 ft balcony" className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="quote-consent" name="consent" required className="mt-1 h-4 w-4" />
        <label htmlFor="quote-consent" className="text-sm text-text-muted">I agree to be contacted about this quote request.</label>
      </div>

      <Button type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Get Quick Quote"}
      </Button>
    </form>
  );
}
