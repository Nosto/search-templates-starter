import type { Preview } from "@storybook/preact-vite"
import "../src/variable.css"
import { withWrapperStyles } from "./decorators"

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: ["Introduction", "Autocomplete", "Components", "Elements"]
      }
    }
  },
  decorators: [withWrapperStyles]
} as Preview
