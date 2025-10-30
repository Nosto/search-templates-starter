/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'ns-black': '#000000',
        'ns-white': '#ffffff',
        'ns-grey-light': '#f0f3f6',
        'ns-grey': '#96a9bd',
        'ns-grey-dark': '#516980',
        'ns-primary-light': '#d9f0ff',
        'ns-primary': '#2473d6',
        'ns-primary-dark': '#16539e',
        'ns-link': '#2473d6',
        'ns-red': '#e53e3e',
        'ns-focus': '#f0f3f6',
      },
      fontFamily: {
        'ns': ['Arial', 'sans-serif'],
      },
      fontSize: {
        'ns-5': '1rem',
        'ns-4': '0.9rem',
        'ns-3': '0.75rem',
        'ns-2': '0.6rem',
        'ns-1': '0.3rem',
      },
      fontWeight: {
        'ns-bold': '700',
        'ns-medium': '500',
        'ns-regular': '400',
      },
      spacing: {
        'ns-5': '1.5rem',
        'ns-4': '1rem',
        'ns-3': '0.75rem',
        'ns-2': '0.5rem',
        'ns-1': '0.25rem',
        'ns-05': '5px',
        'ns-10': '10px',
        'ns-16': '16px',
      },
      borderRadius: {
        'ns-3': '3px',
        'ns-4': '4px',
        'ns-circle': '50%',
        'ns-pill': '50px',
      },
      borderWidth: {
        'ns-none': '0',
        'ns-thin': '1px',
        'ns-medium': '2px',
        'ns-thick': '8px',
      },
      lineHeight: {
        'ns-tiny': '1',
      },
      zIndex: {
        'ns-autocomplete': '9000',
        'ns-sidebar-backdrop': '1051',
        'ns-sidebar-wrapper': '1052',
        'ns-sidebar-close': '1053',
        'ns-header-control': '1040',
      },
      boxShadow: {
        'ns-button': 'inset 0 0 40px rgb(0 0 0 / 0.25)',
        'ns-slider-handle': '0 0 5px #16539e',
        'ns-autocomplete': '2px 2px 2px #96a9bd',
      },
      transitionDuration: {
        'ns': '300ms',
      },
      transitionTimingFunction: {
        'ns': 'ease-in-out',
      },
      maxWidth: {
        'ns-search-template': '1500px',
        'ns-autocomplete': '1250px',
        'ns-mobile-sidebar': '400px',
        'ns-mobile-close-sidebar': '38px',
        'ns-select': '150px',
      },
      width: {
        'ns-mobile-sidebar': '400px',
        'ns-mobile-close-sidebar': '38px',
        'ns-icon': '12px',
        'ns-input-checkbox': '16px',
        'ns-input-checkbox-tick': '5px',
        'ns-select': '150px',
        'ns-product-image': '60px',
        'ns-autocomplete-offset': '4px',
      },
      height: {
        'ns-icon': '12px',
        'ns-input-checkbox': '16px',
        'ns-input-checkbox-tick': '10px',
      },
      minHeight: {
        'ns-content': '890px',
      },
      maxHeight: {
        'ns-facet': '500px',
      },
    },
  },
  plugins: [],
}
