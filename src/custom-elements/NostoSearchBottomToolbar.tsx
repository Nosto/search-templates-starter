import { BaseNostoElement } from "./base"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"

/**
 * Custom element wrapper for the BottomToolbar component.
 * Displays pagination and items per page selector.
 */
export class NostoSearchBottomToolbar extends BaseNostoElement {
  protected createComponent() {
    return <BottomToolbar />
  }

  connectedCallback() {
    super.connectedCallback()

    // Listen for bottom toolbar-related events
    this.addEventListener("nosto-page-changed", this.handlePageChanged.bind(this))
    this.addEventListener("nosto-page-size-changed", this.handlePageSizeChanged.bind(this))
  }

  private handlePageChanged(event: Event) {
    // Relay page change events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-page-changed", customEvent.detail)
  }

  private handlePageSizeChanged(event: Event) {
    // Relay page size change events
    const customEvent = event as CustomEvent
    this.dispatchCustomEvent("nosto-search-page-size-changed", customEvent.detail)
  }
}

// Register the custom element
if (!customElements.get("nosto-search-bottom-toolbar")) {
  customElements.define("nosto-search-bottom-toolbar", NostoSearchBottomToolbar)
}
