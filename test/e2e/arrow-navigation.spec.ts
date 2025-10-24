import { test, expect } from "@playwright/test"
import { dropdownSelector, dropdownTimeout, searchSelector, waitForApplicationReady } from "./helpers"

test.describe("Arrow Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await waitForApplicationReady(page)
  })

  test("arrow key navigation works in autocomplete dropdown", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    await page.focus(searchSelector)
    await page.keyboard.press("Tab")

    // Get all focusable autocomplete elements
    const autocompleteElements = page.locator(".ns-autocomplete-element")

    // Verify elements are present
    const elementCount = await autocompleteElements.count()
    expect(elementCount).toBeGreaterThan(0)

    // Focus should start on the first element by default
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", 0)

    // Press ArrowDown to move to next element
    await page.keyboard.press("ArrowDown")

    // Check that focus moved (first element should now have tabindex -1, second should have 0)
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", -1)
    await expect(autocompleteElements.nth(1)).toHaveJSProperty("tabIndex", 0)

    // Press ArrowUp to go back to first element
    await page.keyboard.press("ArrowUp")
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", 0)
    await expect(autocompleteElements.nth(1)).toHaveJSProperty("tabIndex", -1)

    // Test ArrowRight (should move forward like ArrowDown)
    await page.keyboard.press("ArrowRight")
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", -1)
    await expect(autocompleteElements.nth(1)).toHaveJSProperty("tabIndex", 0)

    // Test ArrowLeft (should move backward like ArrowUp)
    await page.keyboard.press("ArrowLeft")
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", 0)
    await expect(autocompleteElements.nth(1)).toHaveJSProperty("tabIndex", -1)
  })

  test("enter key activates focused autocomplete item", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveJSProperty("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    await page.focus(searchSelector)
    await page.keyboard.press("Tab")

    // Get first focusable element (should be a keyword suggestion)
    const firstElement = page.locator(".ns-autocomplete-element").first()

    // Ensure first element is focused
    await expect(firstElement).toHaveJSProperty("tabIndex", 0)

    // Press Enter to activate it
    await page.keyboard.press("Enter")

    // Should navigate to search results for that keyword
    await expect(page).toHaveURL(/\?q=/, { timeout: dropdownTimeout })
  })

  test("navigation stops at boundaries", async ({ page }) => {
    const searchInput = page.locator(searchSelector)
    const dropdownContent = page.locator(`${dropdownSelector} > div`)

    await expect(searchInput).toHaveAttribute("autocomplete", "off")

    // Type to trigger autocomplete
    await searchInput.fill("running")
    await expect(dropdownContent).toContainText("running shoes", { timeout: dropdownTimeout })

    await page.focus(searchSelector)
    await page.keyboard.press("Tab")

    const autocompleteElements = page.locator(".ns-autocomplete-element")
    const elementCount = await autocompleteElements.count()

    // Verify we have multiple elements to test boundary behavior
    expect(elementCount).toBeGreaterThan(1)

    // Start at first element
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", 0)

    // Press ArrowUp from first element should do nothing (stay at first)
    await page.keyboard.press("ArrowUp")
    await expect(autocompleteElements.first()).toHaveJSProperty("tabIndex", 0)

    // Navigate to last element
    for (let i = 1; i < elementCount; i++) {
      await page.keyboard.press("ArrowDown")
    }
    await expect(autocompleteElements.last()).toHaveJSProperty("tabIndex", 0)

    // Press ArrowDown from last element should do nothing (stay at last)
    await page.keyboard.press("ArrowDown")
    await expect(autocompleteElements.last()).toHaveJSProperty("tabIndex", 0)
  })
})
