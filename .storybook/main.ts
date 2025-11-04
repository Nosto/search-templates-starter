import type { StorybookConfig } from "@storybook/preact-vite"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  stories: ["./*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
} as StorybookConfig
