import { test, expect } from "@playwright/test";

test("renders Hello World page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Hello World")).toBeVisible();
});
