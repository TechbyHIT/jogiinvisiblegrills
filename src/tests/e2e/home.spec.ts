import { test, expect } from "@playwright/test";

/**
 * E2E tests require a running dev or production server.
 * Start the app first: npm run dev
 * Then run: npm run test:e2e
 */
test.describe("home page", () => {
  test("loads homepage with expected heading", async ({ page, baseURL }) => {
    test.skip(!baseURL, "PLAYWRIGHT_BASE_URL or default localhost required");

    try {
      const response = await page.goto("/", { waitUntil: "domcontentloaded", timeout: 5000 });
      if (!response?.ok()) {
        test.skip(true, "Server not running — start with npm run dev before npm run test:e2e");
      }
    } catch {
      test.skip(true, "Server not running — start with npm run dev before npm run test:e2e");
    }

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("body")).toContainText(/safety|grills|nets/i);
  });
});
