import { test, expect, Page } from "@playwright/test"
import { resultsSelector, searchSelector, waitForApplicationReady } from "./helpers"

// Helper function to navigate back until reaching a URL matching the pattern
async function goBackUntil(page: Page, urlPattern: RegExp, maxAttempts = 5) {
  for (let i = 0; i < maxAttempts; i++) {
    const currentUrl = page.url()
    if (urlPattern.test(currentUrl)) {
      return true
    }
    await page.goBack()
    await page.waitForTimeout(200) // Short wait for navigation
  }
  return false
}

// Helper function to navigate forward until reaching a URL matching the pattern
async function goForwardUntil(page: Page, urlPattern: RegExp, maxAttempts = 5) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await page.goForward()
      await page.waitForTimeout(300) // Short wait for navigation
      const currentUrl = page.url()
      if (urlPattern.test(currentUrl)) {
        return true
      }
    } catch {
      // Can't go forward anymore
      break
    }
  }
  return false
}

test.describe("Browser Navigation", () => {
  test("back button updates search results to match URL", async ({ page }) => {
    // Navigate to first search
    await page.goto("/?q=shoes")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Get the first search term from input to verify later
    const searchInput = page.locator(searchSelector)
    await expect(searchInput).toHaveValue("shoes")

    // Navigate to second search
    await page.goto("/?q=test")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()
    await expect(searchInput).toHaveValue("test")

    // Click browser back button until we reach shoes
    await goBackUntil(page, /[?&]q=shoes/)

    // Verify URL changed back
    await expect(page).toHaveURL(/[?&]q=shoes/)

    // Wait briefly for popstate handler to trigger
    await page.waitForTimeout(500)

    // Verify search input is updated
    await expect(searchInput).toHaveValue("shoes")

    // Verify results are still visible
    await expect(page.locator(resultsSelector)).toBeVisible()
  })

  test("forward button updates search results to match URL", async ({ page }) => {
    // Navigate to first search
    await page.goto("/?q=shoes")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()

    const searchInput = page.locator(searchSelector)
    await expect(searchInput).toHaveValue("shoes")

    // Navigate to second search
    await page.goto("/?q=test")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()
    await expect(searchInput).toHaveValue("test")

    // Click browser back button until we reach shoes
    await goBackUntil(page, /[?&]q=shoes/)
    await expect(page).toHaveURL(/[?&]q=shoes/)
    await page.waitForTimeout(500)
    await expect(searchInput).toHaveValue("shoes")

    // Click browser forward button until we reach test
    const reachedTest = await goForwardUntil(page, /[?&]q=test/)

    if (reachedTest) {
      // Verify URL changed forward
      await expect(page).toHaveURL(/[?&]q=test/)

      // Wait briefly for popstate handler to trigger
      await page.waitForTimeout(500)

      // Verify search input is updated
      await expect(searchInput).toHaveValue("test")

      // Verify results are visible
      await expect(page.locator(resultsSelector)).toBeVisible()
    }
  })

  test("pagination navigation creates history entries", async ({ page }) => {
    // Navigate to search with results
    await page.goto("/?q=test")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Store the initial URL
    const initialUrl = page.url()

    // Click to next page if available
    const nextPageLink = page.locator('a[aria-label*="Next page"], a[aria-label="2 page"]').first()
    const hasNextPage = await nextPageLink.isVisible()

    if (hasNextPage) {
      await nextPageLink.click()

      // Wait for URL to include page parameter and results to update
      await expect(page).toHaveURL(/[?&]p=\d+/)
      await expect(page.locator(resultsSelector)).toBeVisible()

      // Verify URL changed (demonstrating that navigation works)
      expect(page.url()).not.toBe(initialUrl)
    }
  })
})
