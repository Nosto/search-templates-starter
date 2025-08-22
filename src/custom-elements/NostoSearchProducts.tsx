import { BaseNostoElement } from "./base"
import Products from "@/components/Products/Products"

/**
 * Custom element wrapper for the Products component.
 * Displays the grid of product results.
 */
export class NostoSearchProducts extends BaseNostoElement {
  protected createComponent() {
    return <Products />
  }

  connectedCallback() {
    super.connectedCallback()

    // Listen for product-related events
    this.addEventListener("nosto-product-clicked", this.handleProductClicked.bind(this))
    this.addEventListener("nosto-products-loaded", this.handleProductsLoaded.bind(this))
  }

  private handleProductClicked(event: Event) {
    // Relay product click events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-product-clicked", customEvent.detail)
  }

  private handleProductsLoaded(event: Event) {
    // Relay products loaded events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-products-loaded", customEvent.detail)
  }
}

// Register the custom element
if (!customElements.get("nosto-search-products")) {
  customElements.define("nosto-search-products", NostoSearchProducts)
}
