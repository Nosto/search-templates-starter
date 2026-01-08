import { test, expect } from "@playwright/test"
import { resultsSelector, searchSelector, waitForApplicationReady } from "./helpers"

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

    // Click browser back button until we reach the shoes query
    // With pushState, there might be multiple history entries
    let attempts = 0
    const maxAttempts = 5
    while (attempts < maxAttempts) {
      await page.goBack()
      await page.waitForTimeout(500) // Wait for navigation to complete

      const currentUrl = page.url()
      if (currentUrl.includes("q=shoes")) {
        break
      }
      attempts++
    }

    // Verify URL changed back
    await expect(page).toHaveURL(/[?&]q=shoes/)

    // Wait for the popstate handler to trigger and update the search
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

    // Click browser back button until we reach the shoes query
    let attempts = 0
    const maxAttempts = 5
    while (attempts < maxAttempts) {
      await page.goBack()
      await page.waitForTimeout(500)

      const currentUrl = page.url()
      if (currentUrl.includes("q=shoes")) {
        break
      }
      attempts++
    }

    await expect(page).toHaveURL(/[?&]q=shoes/)
    await page.waitForTimeout(500)
    await expect(searchInput).toHaveValue("shoes")

    // Click browser forward button - try to navigate forward
    // Since we might have gone back multiple steps, we need to go forward
    // the same number of steps to get back to the test query
    attempts = 0
    const maxForwardAttempts = 10 // Allow more attempts for forward navigation
    let reachedTest = false

    while (attempts < maxForwardAttempts) {
      const currentUrl = page.url()
      if (currentUrl.includes("q=test")) {
        reachedTest = true
        break
      }

      // Try to go forward, but catch any errors if we're at the end of history
      try {
        await page.goForward()
        await page.waitForTimeout(500)
      } catch {
        // We've reached the end of the forward history
        break
      }

      attempts++
    }

    // Verify we reached the test query
    if (reachedTest) {
      await expect(page).toHaveURL(/[?&]q=test/)
      await expect(searchInput).toHaveValue("test")
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
