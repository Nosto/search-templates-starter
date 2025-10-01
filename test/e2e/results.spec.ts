import { test, expect } from "@playwright/test"
import { navigateAndWait, waitForSearchResults, waitForStableElement } from "./helpers/testUtils"

test.describe("Results", () => {
  const searchSelector = "input[name='q']"
  const resultsSelector = "#serp"

  test("page renders result when opening with a q parameter that has at least 3 characters", async ({ page }) => {
    // Navigate with query parameter and wait for page to be ready
    await navigateAndWait(page, "/?q=shoes")
    await page.waitForSelector(searchSelector)

    // Wait for search results to load and stabilize
    await waitForSearchResults(page, resultsSelector, "BrandAPremium")

    // Verify search query is reflected in the input
    const searchInput = page.locator(searchSelector)
    await expect(searchInput).toHaveValue("shoes", { timeout: 3000 })

    // Verify we have product results showing - wait for product links to be available
    const productLinks = page.locator('a[href*="example.com/product"]')
    await waitForStableElement(productLinks.first())
  })

  test("pagination works", async ({ page }) => {
    // Navigate with query to get results and wait for page to be ready
    await navigateAndWait(page, "/?q=test")
    await page.waitForSelector(searchSelector)

    // Wait for search results to load and stabilize
    await waitForSearchResults(page, resultsSelector, "BrandAPremium")

    // Look for pagination elements - check page numbers with better timeout
    const pageNumbers = page.locator('a[aria-label*="page"]')
    await waitForStableElement(pageNumbers.first())

    // Check if there's a "Next page" link or page 2 - wait for it to be interactable
    const nextPageLink = page.locator('a[aria-label*="Next page"], a[aria-label="2 page"]').first()

    // Wait a moment for pagination elements to stabilize and check visibility
    await page.waitForTimeout(500)

    if (await nextPageLink.isVisible()) {
      // Ensure the link is clickable before clicking
      await expect(nextPageLink).toBeEnabled({ timeout: 3000 })
      await nextPageLink.click()

      // Wait for navigation and new page load
      await page.waitForLoadState("networkidle")

      // Verify URL changed to include page parameter with longer timeout
      await expect(page).toHaveURL(/[?&]p=\d+/, { timeout: 5000 })

      // Wait for new results to load after pagination
      await waitForSearchResults(page, resultsSelector, "BrandCModern")

      // Check pagination status changed - use a more robust selector approach
      const paginationInfo = page
        .locator('[class*="pagination"], [aria-label*="pagination"]')
        .filter({ hasText: /\d+ - \d+ of \d+ items/ })
      await expect(paginationInfo).toBeVisible({ timeout: 5000 })
    } else {
      // If no next page, just verify pagination structure exists
      await expect(pageNumbers.first()).toBeVisible({ timeout: 3000 })
    }
  })
})
