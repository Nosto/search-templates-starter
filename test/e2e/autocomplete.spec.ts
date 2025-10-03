import { test, expect } from "@playwright/test"

test.describe("Autocomplete", () => {
  const searchSelector = "input[name='q']"
  const dropdownSelector = "#dropdown"

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector(searchSelector)
  })

  test("autocomplete dropdown opens after having typed three characters in the input", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    // Initially, dropdown should not contain autocomplete suggestions
    await expect(dropdown).toBeEmpty()

    // Type 1-2 characters - dropdown should not show results yet
    await searchInput.fill("ru")
    await expect(dropdown).toBeEmpty()

    await searchInput.fill("run")

    // add fourth character to make sure debounce delay is over
    await searchInput.fill("runn")

    // Wait for autocomplete to appear with mock data
    await expect(dropdownContent).toContainText("running shoes", { timeout: 1000 })
    await expect(dropdownContent).toContainText("running gear")
  })

  test("autocomplete dropdown closes on search submit", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await searchInput.fill("run")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: 1000 })

    // Submit by clicking "See all search results" button
    await page.getByRole("button", { name: "See all search results" }).click()

    // Should navigate to results page
    await expect(page).toHaveURL(/\?q=running/)

    // Dropdown should no longer contain autocomplete suggestions (now on results page)
    await expect(dropdown).toBeEmpty()
  })

  test.skip("autocomplete dropdown closes when clicked outside input and autocomplete dropdown", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: 1000 })

    // Click outside the input and dropdown (on the page body)
    await page.locator("body").click({ position: { x: 50, y: 10 } })

    // Dropdown should close after clicking outside
    await expect(dropdown).toBeEmpty()
  })
})
