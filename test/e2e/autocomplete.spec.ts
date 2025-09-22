import { test, expect } from "@playwright/test"

test.describe("Autocomplete", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("autocomplete dropdown opens after having typed three characters in the input", async ({ page }) => {
    const searchInput = page.locator("#search")
    const dropdown = page.locator("#dropdown")

    // Initially, dropdown should not contain autocomplete suggestions
    await expect(dropdown).not.toContainText("running shoes")

    // Type 1-2 characters - dropdown should not show results yet
    await searchInput.fill("ru")
    await page.waitForTimeout(50) // Minimal wait for any potential updates
    await expect(dropdown).not.toContainText("running shoes")

    // Type 3rd character - autocomplete should trigger
    await searchInput.fill("run")

    // Wait for autocomplete to appear with mock data
    await expect(dropdown).toContainText("running shoes", { timeout: 1000 })
    await expect(dropdown).toContainText("running gear")
  })

  test("autocomplete dropdown closes on search submit", async ({ page }) => {
    const searchInput = page.locator("#search")
    const dropdown = page.locator("#dropdown")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdown).toContainText("running shoes", { timeout: 1000 })

    // Submit by clicking "See all search results" button
    await page.getByRole("button", { name: "See all search results" }).click()

    // Should navigate to results page
    await expect(page).toHaveURL(/\?q=running/)

    // Dropdown should no longer contain autocomplete suggestions (now on results page)
    await expect(dropdown).not.toContainText("running shoes", { timeout: 500 })
  })

  test("autocomplete dropdown closes when clicked outside input and autocomplete dropdown", async ({ page }) => {
    const searchInput = page.locator("#search")
    const dropdown = page.locator("#dropdown")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdown).toContainText("running shoes", { timeout: 1000 })

    // Click outside the input and dropdown (on the page body)
    await page.locator("body").click({ position: { x: 50, y: 10 } })

    // Dropdown should close after clicking outside
    await expect(dropdown).not.toContainText("running shoes", { timeout: 500 })
  })
})
