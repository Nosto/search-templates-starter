/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ns-black": "var(--ns-color-black)",
        "ns-white": "var(--ns-color-white)",
        "ns-grey-light": "var(--ns-color-grey-light)",
        "ns-grey": "var(--ns-color-grey)",
        "ns-grey-dark": "var(--ns-color-grey-dark)",
        "ns-primary-light": "var(--ns-color-primary-light)",
        "ns-primary": "var(--ns-color-primary)",
        "ns-primary-dark": "var(--ns-color-primary-dark)",
        "ns-link": "var(--ns-color-link)"
      },
      fontSize: {
        "ns-1": "var(--ns-font-size-1)",
        "ns-2": "var(--ns-font-size-2)",
        "ns-3": "var(--ns-font-size-3)",
        "ns-4": "var(--ns-font-size-4)",
        "ns-5": "var(--ns-font-size-5)"
      },
      fontWeight: {
        "ns-regular": "var(--ns-weight-regular)",
        "ns-medium": "var(--ns-weight-medium)",
        "ns-bold": "var(--ns-weight-bold)"
      },
      spacing: {
        "ns-1": "var(--ns-space-1)",
        "ns-2": "var(--ns-space-2)",
        "ns-3": "var(--ns-space-3)",
        "ns-4": "var(--ns-space-4)",
        "ns-5": "var(--ns-space-5)"
      },
      borderRadius: {
        "ns-3": "var(--ns-border-radius-3)",
        "ns-4": "var(--ns-border-radius-4)",
        "ns-circle": "var(--ns-border-radius-circle)"
      },
      lineHeight: {
        "ns-tiny": "var(--ns-line-height-tiny)"
      },
      zIndex: {
        "ns-autocomplete": "var(--ns-z-index-autocomplete)",
        "ns-sidebar-backdrop": "var(--ns-z-index-sidebar-backdrop)",
        "ns-sidebar-wrapper": "var(--ns-z-index-sidebar-wrapper)",
        "ns-sidebar-close": "var(--ns-z-index-sidebar-close)",
        "ns-header-control": "var(--ns-header-control)"
      },
      boxShadow: {
        "ns-button": "var(--ns-box-shadow-button)",
        "ns-slider-handle": "var(--ns-box-shadow-slider-handle)"
      },
      maxWidth: {
        "ns-search-template": "var(--ns-max-width-search-template)",
        "ns-autocomplete": "var(--ns-max-width-autocomplete)"
      },
      width: {
        "ns-mobile-sidebar": "var(--ns-width-mobile-sidebar)",
        "ns-mobile-close-sidebar": "var(--ns-width-mobile-close-sidebar)",
        "ns-icon": "var(--ns-width-icon)",
        "ns-input-checkbox": "var(--ns-width-input-checkbox)",
        "ns-input-checkbox-tick": "var(--ns-width-input-checkbox-tick)"
      },
      height: {
        "ns-icon": "var(--ns-height-icon)",
        "ns-input-checkbox": "var(--ns-height-input-checkbox)",
        "ns-input-checkbox-tick": "var(--ns-height-input-checkbox-tick)"
      }
    }
  },
  plugins: [],
  variants: {
    extend: {
      display: ["peer-checked"],
      position: ["peer-checked"],
      maxHeight: ["peer-checked"],
      zIndex: ["peer-checked"]
    }
  }
}
