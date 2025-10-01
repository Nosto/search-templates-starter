import { Page, Locator, expect } from "@playwright/test"

/**
 * Test utilities for more reliable e2e tests
 */

/**
 * Wait for an element to be visible and stable (not moving)
 */
export async function waitForStableElement(locator: Locator, timeout = 5000): Promise<void> {
  await expect(locator).toBeVisible({ timeout })
  // Wait a bit more for potential animations or layout shifts to complete
  await locator.page().waitForTimeout(100)
}

/**
 * Wait for page to be fully loaded including network requests
 */
export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded")
  await page.waitForLoadState("networkidle")
}

/**
 * Type text with proper debounce consideration for search inputs
 */
export async function typeWithDebounce(locator: Locator, text: string, debounceMs = 300): Promise<void> {
  await locator.fill(text)
  // Wait for debounce delay to ensure search triggers properly
  await locator.page().waitForTimeout(debounceMs)
}

/**
 * Wait for search results to load and stabilize
 */
export async function waitForSearchResults(
  page: Page,
  resultsSelector: string,
  expectedContent?: string
): Promise<void> {
  const results = page.locator(resultsSelector)
  await expect(results).toBeVisible({ timeout: 10000 })

  if (expectedContent) {
    await expect(results).toContainText(expectedContent, { timeout: 8000 })
  }

  // Small additional wait for content to stabilize
  await page.waitForTimeout(200)
}

/**
 * Navigate and wait for page to be ready
 */
export async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url)
  await waitForPageReady(page)
}
