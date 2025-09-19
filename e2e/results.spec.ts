import { test, expect } from "@playwright/test"

test.describe("Search results functionality", () => {
  test("page renders search results when navigating with q parameter", async ({ page }) => {
    // Navigate with a query parameter that has at least 3 characters
    await page.goto("/?q=shoes")

    // Wait for the search results container to be visible
    await expect(page.locator("#serp")).toBeVisible()

    // Check that products are displayed (mocked data should return products)
    await expect(page.locator('[data-nosto-element="product"]').first()).toBeVisible({ timeout: 10000 })

    // Check that multiple products are rendered (mocked data returns 24 products by default)
    const products = page.locator('[data-nosto-element="product"]')
    await expect(products).toHaveCount(24, { timeout: 10000 })

    // Verify the URL still contains the query parameter
    await expect(page).toHaveURL(/[?&]q=shoes/)
  })

  test("search results show product information", async ({ page }) => {
    // Navigate with a query
    await page.goto("/?q=test")

    // Wait for products to load
    await expect(page.locator('[data-nosto-element="product"]').first()).toBeVisible({ timeout: 10000 })

    // Check that products have expected content (prices, names, etc.)
    const firstProduct = page.locator('[data-nosto-element="product"]').first()

    // Should have product price
    await expect(firstProduct).toContainText("€") // Price should be visible

    // Should have product name/text content
    await expect(firstProduct).not.toBeEmpty()
  })

  test("search works with different query lengths", async ({ page }) => {
    // Test with exactly 3 characters
    await page.goto("/?q=abc")
    await expect(page.locator("#serp")).toBeVisible()

    // Should show products (mock returns data for any query)
    await expect(page.locator('[data-nosto-element="product"]').first()).toBeVisible({ timeout: 10000 })

    // Test with longer query
    await page.goto("/?q=running+shoes")
    await expect(page.locator('[data-nosto-element="product"]').first()).toBeVisible({ timeout: 10000 })
  })

  // Note: Search input population from URL parameters is not working in the current implementation
  // The SearchQueryHandler correctly reads URL parameters and triggers searches, but the search input
  // field is not being populated with the query value. This would require additional implementation
  // in the Autocomplete component to sync with the app state.

  test("search input is populated from URL parameter", async ({ page }) => {
    await page.goto("/?q=shoes")
    
    // Wait for the search input to be populated
    await expect(page.locator("#search")).toHaveValue("shoes", { timeout: 5000 })
  })

  // Note: Pagination is not appearing with the current setup
  // The mock returns 24 products with total: 240 (10x size) which should trigger pagination,
  // but the pagination component may not be rendering correctly
  test("pagination navigation works", async ({ page }) => {
    await page.goto("/?q=shoes")
    await expect(page.locator('[data-nosto-element="product"]').first()).toBeVisible({ timeout: 10000 })

    const nextButton = page.locator('a[aria-label="Next page"]')
    await expect(nextButton).toBeVisible({ timeout: 5000 })

    await nextButton.click()
    await expect(page).toHaveURL(/[?&]p=2/)
  })
})
