import { z } from "zod";

export const quoteFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  locality: z.string().trim().min(2).max(120),
  serviceSlug: z.string().trim().optional(),
  propertyType: z.string().trim().optional(),
  dimensions: z.string().trim().max(500).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true),
});

export type QuoteFormInput = z.infer<typeof quoteFormSchema>;
