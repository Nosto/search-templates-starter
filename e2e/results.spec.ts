import { test, expect } from "@playwright/test"

test.describe("Search results functionality in dev:mocked mode", () => {
  test("page renders results when opening with a q parameter that has at least 3 characters", async ({ page }) => {
    await page.goto("/?q=running")

    await page.waitForTimeout(2000)

    const serpSection = page.locator("#serp")

    await expect(serpSection).not.toBeEmpty()

    await expect(serpSection.getByText("products")).toBeVisible()
  })
})