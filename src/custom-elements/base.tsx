import { render } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { serpConfig } from "@/config"
import { JSX } from "preact"

/**
 * Base class for custom elements that wrap Preact components.
 * Provides common functionality for rendering Preact components without shadow DOM.
 */
export abstract class BaseNostoElement extends HTMLElement {
  private mounted = false

  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.mounted) {
      this.mount()
      this.mounted = true
    }
  }

  disconnectedCallback() {
    if (this.mounted) {
      this.unmount()
      this.mounted = false
    }
  }

  /**
   * Mount the Preact component inside this custom element.
   * Components are wrapped with SearchPageProvider to access search context.
   */
  private mount() {
    const component = this.createComponent()
    render(<SearchPageProvider config={serpConfig}>{component}</SearchPageProvider>, this)
  }

  /**
   * Unmount the Preact component.
   */
  private unmount() {
    render(null, this)
  }

  /**
   * Create the Preact component to render.
   * Must be implemented by subclasses.
   */
  protected abstract createComponent(): JSX.Element

  /**
   * Dispatch a custom event from this element.
   */
  protected dispatchCustomEvent(type: string, detail?: unknown) {
    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(event)
  }

  /**
   * Listen for custom events on this element.
   */
  public addEventListener(type: string, listener: EventListener) {
    super.addEventListener(type, listener)
  }
}
