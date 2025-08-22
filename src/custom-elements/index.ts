// Export all custom elements
export { NostoSearchFilters } from "./NostoSearchFilters"
export { NostoSearchToolbar } from "./NostoSearchToolbar"
export { NostoSearchProducts } from "./NostoSearchProducts"
export { NostoSearchBottomToolbar } from "./NostoSearchBottomToolbar"
export { BaseNostoElement } from "./base"

// Import all custom elements to ensure they are registered
import "./NostoSearchFilters"
import "./NostoSearchToolbar"
import "./NostoSearchProducts"
import "./NostoSearchBottomToolbar"

// Define types for the custom elements
export interface NostoCustomElementTagMap {
  "nosto-search-filters": HTMLElement
  "nosto-search-toolbar": HTMLElement
  "nosto-search-products": HTMLElement
  "nosto-search-bottom-toolbar": HTMLElement
}

declare global {
  interface HTMLElementTagNameMap {
    "nosto-search-filters": HTMLElement
    "nosto-search-toolbar": HTMLElement
    "nosto-search-products": HTMLElement
    "nosto-search-bottom-toolbar": HTMLElement
  }
}
