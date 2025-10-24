import { test, expect } from "@playwright/test"
import {
  dropdownSelector,
  dropdownTimeout,
  navigationTimeout,
  searchSelector,
  waitForApplicationReady
} from "./helpers"
import { skipIfNoBrowsers } from "./test-helpers"

test.describe("Keyword Redirect", () => {
  test.beforeEach(async ({ page }) => {
    skipIfNoBrowsers()
    await page.goto("/")
    await waitForApplicationReady(page)
  })

  test("keyword with _redirect property redirects when clicked", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)

    // Type to trigger autocomplete with keywords that include redirects
    await searchInput.fill("sale")

    // Wait for autocomplete dropdown to appear
    await expect(dropdown).not.toBeEmpty({ timeout: dropdownTimeout })

    // Look for the "sale items" keyword suggestion which should have a redirect
    const saleItemsKeyword = page.locator(dropdownSelector).getByText("sale items").first()

    // Wait for the keyword to be visible
    await expect(saleItemsKeyword).toBeVisible({ timeout: 1000 })

    // Set up a promise to wait for navigation
    const navigationPromise = page.waitForURL("https://example.com/sale-items", { timeout: navigationTimeout })

    // Click the keyword
    await saleItemsKeyword.click()

    // Wait for the redirect to happen
    await navigationPromise

    // Verify we're now on the redirect URL
    expect(page.url()).toBe("https://example.com/sale-items")
  })

  test("keyword without _redirect property submits search when clicked", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)

    // Type to trigger autocomplete
    await searchInput.fill("running")

    // Wait for autocomplete dropdown to appear
    await expect(dropdown).not.toBeEmpty({ timeout: dropdownTimeout })

    // Look for a regular keyword without redirect (e.g., "running shoes")
    const runningKeyword = page.locator(dropdownSelector).getByText("running shoes").first()

    // Wait for the keyword to be visible
    await expect(runningKeyword).toBeVisible({ timeout: 1000 })

    // Click the keyword
    await runningKeyword.click()

    // Should navigate to search results page, not redirect externally
    await expect(page).toHaveURL(/\?q=running\+shoes/, { timeout: 2000 })

    // Verify we're still on the same domain (not redirected externally)
    expect(page.url()).toContain("localhost:8000")
  })
})
