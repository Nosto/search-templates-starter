import { test, expect } from "@playwright/test"
import { dropdownSelector, dropdownTimeout, searchSelector, waitForApplicationReady } from "./helpers"
import { skipIfNoBrowsers } from "./test-helpers"

test.describe("Autocomplete", () => {
  skipIfNoBrowsers()

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await waitForApplicationReady(page)
  })

  test("autocomplete dropdown opens after having typed three characters in the input", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Initially, dropdown should not contain autocomplete suggestions
    await expect(dropdown).toBeEmpty()

    // Type 1-2 characters - dropdown should not show results yet
    await searchInput.fill("ru")
    await expect(dropdown).toBeEmpty()

    await searchInput.fill("run")

    // add fourth character to make sure debounce delay is over
    await searchInput.fill("runn")

    // Wait for autocomplete to appear with mock data
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })
    await expect(dropdownContent).toContainText("running gear")
  })

  test("autocomplete dropdown closes on search submit", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdown = page.locator(dropdownSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    await searchInput.fill("run")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

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

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    // Click outside the input and dropdown (on the page body)
    await page.locator("body").click({ position: { x: 50, y: 10 } })

    // Dropdown should close after clicking outside
    await expect(dropdown).toBeEmpty()
  })
})
