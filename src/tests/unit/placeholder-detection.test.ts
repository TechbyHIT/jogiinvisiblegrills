import { describe, expect, it } from "vitest";
import {
  containsPlaceholders,
  findPlaceholders,
  findPlaceholdersInFields,
  hasPlaceholderContent,
} from "@/lib/seo/placeholder-detection";

describe("placeholder detection", () => {
  it("detects bracket placeholders", () => {
    expect(containsPlaceholders("Call us at [PHONE_NUMBER]")).toBe(true);
    expect(containsPlaceholders("No placeholders here")).toBe(false);
  });

  it("finds all placeholders in text", () => {
    expect(findPlaceholders("Email [EMAIL_ADDRESS] or [PHONE_NUMBER]")).toEqual([
      "[EMAIL_ADDRESS]",
      "[PHONE_NUMBER]",
    ]);
  });

  it("finds placeholders across fields", () => {
    const found = findPlaceholdersInFields([
      "Valid content",
      "WhatsApp [WHATSAPP_RAW]",
      "Another [EMAIL_ADDRESS]",
    ]);
    expect(found).toContain("[WHATSAPP_RAW]");
    expect(found).toContain("[EMAIL_ADDRESS]");
  });

  it("reports placeholder content in field arrays", () => {
    expect(hasPlaceholderContent(["Clean text", "Bad [POSTAL_CODE]"])).toBe(true);
    expect(hasPlaceholderContent(["Clean text only"])).toBe(false);
  });
});
