import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        injected: resolve(__dirname, "src/entries/injected.tsx"),
        native: resolve(__dirname, "src/entries/native.tsx")
      },
      formats: ["es", "cjs"],
      fileName: (format, name) => `${name}.${format}.js`
    }
  },
  plugins: [preact()],
  server: {
    port: 8000
  },
  test: {
    globals: true,
    environment: "jsdom"
  },
  define: {
    __MODE__: JSON.stringify(mode)
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
    dedupe: ["preact", "preact/hooks"]
  }
}))
