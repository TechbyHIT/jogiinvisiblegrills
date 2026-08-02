import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  locality: z
    .string()
    .trim()
    .min(2, "Locality is required")
    .max(120, "Locality is too long"),
  serviceSlug: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few details about your requirement")
    .max(2000, "Message is too long"),
  consent: z.literal(true, {
    message: "Consent is required to submit the form",
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const quickEnquirySchema = contactFormSchema.pick({
  name: true,
  phone: true,
  locality: true,
  serviceSlug: true,
});

export type QuickEnquiryInput = z.infer<typeof quickEnquirySchema>;
