import type { StorybookConfig } from "@storybook/preact-vite"
import { resolve } from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/preact-vite",
    options: {}
  },
  viteFinal: async config => {
    // Ensure the path alias works in Storybook
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "../src")
    }
    return config
  }
}
export default config
