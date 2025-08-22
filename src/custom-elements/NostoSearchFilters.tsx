import { BaseNostoElement } from "./base"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"

/**
 * Custom element wrapper for the SelectedFilters component.
 * Displays active filters and allows clearing them.
 */
export class NostoSearchFilters extends BaseNostoElement {
  protected createComponent() {
    return <SelectedFilters />
  }

  connectedCallback() {
    super.connectedCallback()

    // Listen for filter-related events
    this.addEventListener("nosto-filter-changed", this.handleFilterChanged.bind(this))
    this.addEventListener("nosto-filters-cleared", this.handleFiltersCleared.bind(this))
  }

  private handleFilterChanged(event: Event) {
    // Relay filter change events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-filters-changed", customEvent.detail)
  }

  private handleFiltersCleared(event: Event) {
    // Relay filters cleared events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-filters-cleared", customEvent.detail)
  }
}

// Register the custom element
if (!customElements.get("nosto-search-filters")) {
  customElements.define("nosto-search-filters", NostoSearchFilters)
}
