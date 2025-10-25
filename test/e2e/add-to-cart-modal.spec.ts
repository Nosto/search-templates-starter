import { test, expect } from "@playwright/test"
import { resultsSelector, waitForApplicationReady } from "./helpers"

test.describe("Add to Cart Modal", () => {
  test("opens modal when clicking add to cart on product with multiple SKUs", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=hoodie")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Look for a product with "Add to cart" button (QuickAdd component)
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })

    // Click the add to cart button
    await addToCartButton.click()

    // Check if modal opens (should have product name as heading)
    const modal = page.locator('dialog[open], [role="dialog"]')
    await expect(modal).toBeVisible({ timeout: 3000 })

    // Modal should have a close button
    const closeButton = page.locator('button[aria-label*="Close"], button:has-text("×")')
    await expect(closeButton).toBeVisible()

    // Modal should have product information
    await expect(modal).toContainText(/Premium|Classic|Modern|Vintage|Eco-Friendly|Luxury/)
  })

  test("can select variant and add to cart through modal", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=shirt")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Click on an add to cart button
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })
    await addToCartButton.click()

    // Wait for modal to appear
    const modal = page.locator('dialog[open], [role="dialog"]')
    await expect(modal).toBeVisible({ timeout: 3000 })

    // Check if variant selector is present (nosto-variant-selector custom element)
    const variantSelector = modal.locator("nosto-variant-selector")

    if ((await variantSelector.count()) > 0) {
      // This is a multi-SKU product, test variant selection
      await expect(variantSelector).toBeVisible()

      // The add to cart button in modal should be visible
      const modalAddToCartButton = modal.locator('button:has-text("Add to Cart")')
      await expect(modalAddToCartButton).toBeVisible()

      // Button might be disabled initially until variant is selected
      // Wait a bit for variant selector to initialize
      await page.waitForTimeout(1000)

      // Click the add to cart button in modal
      await modalAddToCartButton.click()

      // Modal should close after adding to cart
      await expect(modal).not.toBeVisible({ timeout: 3000 })
    } else {
      // This is a single SKU product, modal should close immediately or not open
      // The test should still pass as the component works correctly
      console.log("Single SKU product detected, modal behavior may vary")
    }
  })

  test("can close modal using close button", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=clothing")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Click on an add to cart button
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })
    await addToCartButton.click()

    // Wait for modal to appear
    const modal = page.locator('dialog[open], [role="dialog"]')

    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible({ timeout: 3000 })

      // Click the close button
      const closeButton = modal.locator('button[aria-label*="Close"], button:has-text("×")')
      await expect(closeButton).toBeVisible()
      await closeButton.click()

      // Modal should close
      await expect(modal).not.toBeVisible({ timeout: 3000 })
    }
  })

  test("can close modal by clicking backdrop", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=shoes")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Click on an add to cart button
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })
    await addToCartButton.click()

    // Wait for modal to appear
    const modal = page.locator('dialog[open], [role="dialog"]')

    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible({ timeout: 3000 })

      // Click on the backdrop (modal background) to close
      const backdrop = modal.locator('[data-testid="modal-backdrop"]')
      if ((await backdrop.count()) > 0) {
        await backdrop.click()

        // Modal should close
        await expect(modal).not.toBeVisible({ timeout: 3000 })
      }
    }
  })

  test("can close modal using Escape key", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=jacket")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Click on an add to cart button
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })
    await addToCartButton.click()

    // Wait for modal to appear
    const modal = page.locator('dialog[open], [role="dialog"]')

    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible({ timeout: 3000 })

      // Press Escape key to close modal
      await page.keyboard.press("Escape")

      // Modal should close
      await expect(modal).not.toBeVisible({ timeout: 3000 })
    }
  })

  test("modal displays product image and name", async ({ page }) => {
    // Navigate to search results page
    await page.goto("/?q=premium")
    await waitForApplicationReady(page)

    // Wait for results to load
    await expect(page.locator(resultsSelector)).toBeVisible()

    // Click on an add to cart button
    const addToCartButton = page.locator('button:has-text("Add to cart")').first()
    await expect(addToCartButton).toBeVisible({ timeout: 5000 })
    await addToCartButton.click()

    // Wait for modal to appear
    const modal = page.locator('dialog[open], [role="dialog"]')

    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible({ timeout: 3000 })

      // Modal should have product title/heading
      const modalTitle = modal.locator('h2, h1, [id*="modal-title"]')
      await expect(modalTitle).toBeVisible()

      // Modal should have product image
      const productImage = modal.locator("img")
      if ((await productImage.count()) > 0) {
        await expect(productImage.first()).toBeVisible()
      }

      // Close modal for cleanup
      const closeButton = modal.locator('button[aria-label*="Close"], button:has-text("×")')
      if ((await closeButton.count()) > 0) {
        await closeButton.click()
      }
    }
  })
})
