import { test, expect } from "@playwright/test"
import { waitForPageReady, typeWithDebounce, waitForStableElement } from "./helpers/testUtils"

test.describe("Autocomplete", () => {
  const searchSelector = "input[name='q']"
  const dropdownSelector = "#dropdown"

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await waitForPageReady(page)
    await page.waitForSelector(searchSelector)
  })

  test("autocomplete dropdown opens after having typed three characters in the input", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)

    // Initially, dropdown should not contain autocomplete suggestions
    await expect(dropdown).not.toContainText("running shoes")

    // Type 1-2 characters - dropdown should not show results yet
    await searchInput.fill("ru")
    await expect(dropdown).not.toContainText("running shoes")

    // Type sufficient characters to trigger autocomplete with proper debounce wait
    await typeWithDebounce(searchInput, "runn", 400)

    // Wait for autocomplete to appear with mock data - increased timeout for stability
    await expect(dropdown).toContainText("running shoes", { timeout: 5000 })
    await expect(dropdown).toContainText("running gear", { timeout: 2000 })
  })

  test("autocomplete dropdown closes on search submit", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)

    // Type to trigger autocomplete with proper debounce
    await typeWithDebounce(searchInput, "running", 400)

    // Wait for autocomplete to appear - increased timeout
    await expect(dropdown).toContainText("running shoes", { timeout: 5000 })

    // Submit by clicking "See all search results" button
    const submitButton = page.getByRole("button", { name: "See all search results" })
    await waitForStableElement(submitButton)
    await submitButton.click()

    // Wait for navigation to complete
    await waitForPageReady(page)
    await expect(page).toHaveURL(/\?q=running/)

    // Dropdown should no longer contain autocomplete suggestions (now on results page)
    await expect(dropdown).not.toContainText("running shoes", { timeout: 3000 })
  })

  test.skip("autocomplete dropdown closes when clicked outside input and autocomplete dropdown", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)

    // Type to trigger autocomplete with proper debounce
    await typeWithDebounce(searchInput, "running", 400)
    await expect(dropdown).toContainText("running shoes", { timeout: 5000 })

    // Click outside the input and dropdown (on the page body)
    await page.locator("body").click({ position: { x: 50, y: 10 } })

    // Dropdown should close after clicking outside - increased timeout
    await expect(dropdown).not.toContainText("running shoes", { timeout: 2000 })
  })
})
