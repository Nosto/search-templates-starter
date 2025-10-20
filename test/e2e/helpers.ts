import { expect, Page } from "@playwright/test"

export const searchSelector = "input[name='q']"
export const dropdownSelector = "#dropdown"
export const resultsSelector = "#serp"

export const dropdownTimeout = 2000
export const navigationTimeout = 5000

export async function waitForApplicationReady(page: Page) {
  const searchInput = page.locator(searchSelector)
  await expect(searchInput).toHaveAttribute("autocomplete", "off")
}
