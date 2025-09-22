import { test, expect } from "@playwright/test"

test.describe("Results", () => {
  test("page renders result when opening with a q parameter that has at least 3 characters", async ({ page }) => {
    // Navigate with query parameter
    await page.goto("/?q=shoes")

    // Wait for results to load
    await expect(page.locator("#serp")).toBeVisible()

    // Check that products are displayed - look for product links
    await expect(page.locator("#serp")).toContainText("Product", { timeout: 1000 })

    // Verify search query is reflected in the input
    const searchInput = page.locator("#search")
    await expect(searchInput).toHaveValue("shoes")

    // Verify we have product results showing
    await expect(page.locator('a[href*="example.com/product"]').first()).toBeVisible()
  })

  test("pagination works", async ({ page }) => {
    // Navigate with query to get results
    await page.goto("/?q=test")

    // Wait for results to load
    await expect(page.locator("#serp")).toBeVisible()
    await expect(page.locator("#serp")).toContainText("Product", { timeout: 1000 })

    // Look for pagination elements - check page numbers
    const pageNumbers = page.locator('a[aria-label*="page"]')
    await expect(pageNumbers.first()).toBeVisible({ timeout: 1000 })

    // Check if there's a "Next page" link or page 2
    const nextPageLink = page.locator('a[aria-label*="Next page"], a[aria-label="2 page"]').first()

    if (await nextPageLink.isVisible()) {
      // Click next page or page 2
      await nextPageLink.click()

      // Verify URL changed to include page parameter
      await expect(page).toHaveURL(/[?&]p=\d+/, { timeout: 1000 })

      // Verify results are still showing
      await expect(page.locator("#serp")).toContainText("Product", { timeout: 1000 })

      // Check pagination status changed
      const paginationInfo = page.locator("text=/\\d+ - \\d+ of \\d+ items/")
      await expect(paginationInfo).toBeVisible()
    } else {
      // If no next page, just verify pagination structure exists
      await expect(pageNumbers.first()).toBeVisible()
    }
  })
})
