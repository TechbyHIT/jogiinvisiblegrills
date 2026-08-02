"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { contactFormSchema } from "@/lib/validation/contact-form";
import { checkRateLimit } from "@/lib/security/rate-limit";

export type ContactFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(`contact:${ip}`, 5, 60_000);
  if (!rateLimit.success) {
    return {
      success: false,
      message: "Too many submissions. Please try again in a minute.",
    };
  }

  if (formData.get("website")) {
    return { success: true, message: "Thank you for your enquiry." };
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    locality: formData.get("locality"),
    serviceSlug: formData.get("serviceSlug") ?? "",
    message: formData.get("message"),
    consent: formData.get("consent") === "on" ? true : formData.get("consent"),
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  console.info("[contact-form]", {
    name: parsed.data.name,
    phone: parsed.data.phone,
    locality: parsed.data.locality,
    serviceSlug: parsed.data.serviceSlug,
    timestamp: new Date().toISOString(),
  });

  redirect("/thank-you/");
}
