import { BaseNostoElement } from "./base"
import Toolbar from "@/components/Toolbar/Toolbar"

/**
 * Custom element wrapper for the Toolbar component.
 * Displays search results count, sort options, and mobile filter toggle.
 */
export class NostoSearchToolbar extends BaseNostoElement {
  protected createComponent() {
    return <Toolbar />
  }

  connectedCallback() {
    super.connectedCallback()

    // Listen for toolbar-related events
    this.addEventListener("nosto-sort-changed", this.handleSortChanged.bind(this))
    this.addEventListener("nosto-filter-toggle", this.handleFilterToggle.bind(this))
  }

  private handleSortChanged(event: Event) {
    // Relay sort change events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-sort-changed", customEvent.detail)
  }

  private handleFilterToggle(event: Event) {
    // Relay filter toggle events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-filter-toggle", customEvent.detail)
  }
}

// Register the custom element
if (!customElements.get("nosto-search-toolbar")) {
  customElements.define("nosto-search-toolbar", NostoSearchToolbar)
}
