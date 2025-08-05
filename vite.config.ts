import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

export default defineConfig({
  build: {
    lib: {
      name: "@nosto/search-templates-starter",
      entry: [resolve(__dirname, "src/index.tsx")],
      formats: ["es", "cjs"],
      fileName: (format, name) => `${name}.${format}.js`
    }
  },
  plugins: [preact()],
  server: {
    port: 8080
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
})
