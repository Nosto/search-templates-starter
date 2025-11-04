// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/preact-vite"
import { resolve, dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
