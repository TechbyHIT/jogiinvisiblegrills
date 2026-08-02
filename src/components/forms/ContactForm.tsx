"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { getPublishedServices } from "@/data/initial-services";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

type ContactFormProps = {
  defaultServiceSlug?: string;
};

export function ContactForm({ defaultServiceSlug }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const services = getPublishedServices();

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !state.success && (
        <div role="alert" className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            placeholder="10-digit mobile"
            className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            aria-invalid={!!state.fieldErrors?.phone}
          />
          {state.fieldErrors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div>
          <label htmlFor="locality" className="block text-sm font-medium text-text mb-1">
            Locality / Area *
          </label>
          <input
            type="text"
            id="locality"
            name="locality"
            required
            placeholder="e.g. Whitefield, Bengaluru"
            className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
          {state.fieldErrors?.locality && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.locality[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="serviceSlug" className="block text-sm font-medium text-text mb-1">
          Service (optional)
        </label>
        <select
          id="serviceSlug"
          name="serviceSlug"
          defaultValue={defaultServiceSlug ?? ""}
          className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Your Requirement *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Share opening dimensions, floor level, photos availability, etc."
          className="w-full rounded-md border border-border px-4 py-2.5 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="consent" className="text-sm text-text-muted">
          I agree to be contacted regarding my enquiry. We do not share your details with third parties.
        </label>
      </div>
      {state.fieldErrors?.consent && (
        <p className="text-sm text-red-600">{state.fieldErrors.consent[0]}</p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting..." : "Send Enquiry"}
      </Button>
    </form>
  );
}
