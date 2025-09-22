import type { Preview } from "@storybook/preact-vite"
import "../src/variable.css"

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
} as Preview
