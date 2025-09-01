declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

// Extend global HTML elements for Nosto Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "nosto-campaign": {
        placement?: string
        "use-template"?: boolean
        api?: string
        className?: string
        ref?: import("preact").RefObject<HTMLElement>
      } & import("preact").JSX.HTMLAttributes<HTMLElement>

      "nosto-dynamic-card": {
        key?: string
        handles?: string
        product?: string
        target?: string
        className?: string
        ref?: import("preact").RefObject<HTMLElement>
      } & import("preact").JSX.HTMLAttributes<HTMLElement>
    }
  }
}
