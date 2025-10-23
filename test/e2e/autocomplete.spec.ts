import { test, expect } from "@playwright/test"
import { dropdownSelector, dropdownTimeout, searchSelector, waitForApplicationReady } from "./helpers"

test.describe("Autocomplete", () => {
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

  test("arrow key navigation works in autocomplete dropdown", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    // Get all focusable autocomplete elements
    const autocompleteElements = page.locator(".ns-autocomplete-element")

    // Verify elements are present
    const elementCount = await autocompleteElements.count()
    expect(elementCount).toBeGreaterThan(0)

    // Focus should start on the first element by default
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "0")

    // Press ArrowDown to move to next element
    await page.keyboard.press("ArrowDown")

    // Check that focus moved (first element should now have tabindex -1, second should have 0)
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "-1")
    await expect(autocompleteElements.nth(1)).toHaveAttribute("tabindex", "0")

    // Press ArrowUp to go back to first element
    await page.keyboard.press("ArrowUp")
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "0")
    await expect(autocompleteElements.nth(1)).toHaveAttribute("tabindex", "-1")

    // Test ArrowRight (should move forward like ArrowDown)
    await page.keyboard.press("ArrowRight")
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "-1")
    await expect(autocompleteElements.nth(1)).toHaveAttribute("tabindex", "0")

    // Test ArrowLeft (should move backward like ArrowUp)
    await page.keyboard.press("ArrowLeft")
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "0")
    await expect(autocompleteElements.nth(1)).toHaveAttribute("tabindex", "-1")
  })

  test("enter key activates focused autocomplete item", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    // Get first focusable element (should be a keyword suggestion)
    const firstElement = page.locator(".ns-autocomplete-element").first()

    // Ensure first element is focused
    await expect(firstElement).toHaveAttribute("tabindex", "0")

    // Press Enter to activate it
    await page.keyboard.press("Enter")

    // Should navigate to search results for that keyword
    await expect(page).toHaveURL(/\?q=/, { timeout: dropdownTimeout })
  })

  test("navigation wraps around at boundaries", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    const autocompleteElements = page.locator(".ns-autocomplete-element")
    const elementCount = await autocompleteElements.count()

    // Verify we have multiple elements to test wrapping
    expect(elementCount).toBeGreaterThan(1)

    // Start at first element
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "0")

    // Press ArrowUp from first element should wrap to last element
    await page.keyboard.press("ArrowUp")
    await expect(autocompleteElements.last()).toHaveAttribute("tabindex", "0")
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "-1")

    // Press ArrowDown from last element should wrap back to first element
    await page.keyboard.press("ArrowDown")
    await expect(autocompleteElements.first()).toHaveAttribute("tabindex", "0")
    await expect(autocompleteElements.last()).toHaveAttribute("tabindex", "-1")
  })
})
