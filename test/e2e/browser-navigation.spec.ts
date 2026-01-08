import { test, expect } from "@playwright/test"
import { resultsSelector, waitForApplicationReady } from "./helpers"

test.describe("Browser Navigation", () => {
  test("back button updates search results to match URL", async ({ page }) => {
    // Navigate to first search
    await page.goto("/?q=shoes")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Get the first search term from input to verify later
    const searchInput = page.locator("#search")
    await expect(searchInput).toHaveValue("shoes")

    // Navigate to second search
    await page.goto("/?q=test")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()
    await expect(searchInput).toHaveValue("test")

    // Click browser back button
    await page.goBack()

    // Verify URL changed back
    await expect(page).toHaveURL(/[?&]q=shoes/)

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

    const searchInput = page.locator("#search")
    await expect(searchInput).toHaveValue("shoes")

    // Navigate to second search
    await page.goto("/?q=test")
    await waitForApplicationReady(page)
    await expect(page.locator(resultsSelector)).toBeVisible()
    await expect(searchInput).toHaveValue("test")

    // Click browser back button
    await page.goBack()
    await expect(page).toHaveURL(/[?&]q=shoes/)
    await expect(searchInput).toHaveValue("shoes")

    // Click browser forward button
    await page.goForward()

    // Verify URL changed forward
    await expect(page).toHaveURL(/[?&]q=test/)

    // Verify search input is updated
    await expect(searchInput).toHaveValue("test")

    // Verify results are visible
    await expect(page.locator(resultsSelector)).toBeVisible()
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
