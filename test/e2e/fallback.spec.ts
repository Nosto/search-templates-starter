import { test, expect, Page } from "@playwright/test"
import { resultsSelector, searchSelector } from "./helpers"

const nativeContent = "Native search results rendered by the store platform."

const fallbackTimeout = 5000

test.describe("Fallback", () => {
  test("hands the page back to the platform when search breaks mid-session", async ({ page }) => {
    const results = page.locator(resultsSelector)
    await page.goto("/?q=shoes")
    await expectProductResults(page)

    await breakNostoSearch(page)
    // the native content belongs to page 1, so the platform renders page 2 instead
    await expectPageLoad(page, () => page.locator('a[aria-label="2 page"]').click())
    await expect(page).toHaveURL(/[?&]p=2/)
    await expect(results).toHaveText(nativeContent)

    await page.reload()
    await expect(results).toHaveText(nativeContent)
    await expectNativeSearch(page)

    await page.getByRole("button", { name: "Reset" }).click()
    await expect(results).not.toHaveText(nativeContent)
  })

  test("restores the native page in place when the first search fails", async ({ page }) => {
    const results = page.locator(resultsSelector)
    await page.goto("/")
    await breakNostoSearch(page)
    await page.goto("/?q=shoes")

    // the template replaces the native content, then hands it back
    await expect(results).not.toHaveText(nativeContent)
    await expect(results).toHaveText(nativeContent, { timeout: fallbackTimeout })

    await expectNativeSearch(page)
  })
})

// mock product names are random, their URLs are not
async function expectProductResults(page: Page) {
  await expect(page.locator(resultsSelector).locator('a[href^="https://example.com/product-"]').first()).toBeVisible()
}

async function breakNostoSearch(page: Page) {
  await page.evaluate(() => sessionStorage.setItem("nosto:search-js:dev:simulate-failure", JSON.stringify("error")))
}

async function expectPageLoad(page: Page, action: () => Promise<void>) {
  const loaded = page.waitForEvent("load")
  await action()
  await loaded
}

function getNavigationType(page: Page) {
  return page.evaluate(() => {
    const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    return navigation.type
  })
}

async function expectNativeSearch(page: Page) {
  const searchInput = page.locator(searchSelector)
  await searchInput.fill("running")
  await expectPageLoad(page, () => searchInput.press("Enter"))

  expect(await getNavigationType(page)).toBe("navigate")
  await expect(page).toHaveURL(/\/\?q=running$/)
  await expect(page.locator(resultsSelector)).toHaveText(nativeContent)
}
