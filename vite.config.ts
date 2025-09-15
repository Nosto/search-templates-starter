import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

const dirname = import.meta.dirname

export default defineConfig(() => ({
  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(dirname, `index.html`),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name][extname]"
      }
    }
  },
  plugins: [preact()],
  server: {
    port: 8000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"]
  },
  resolve: {
    alias: {
      "@": resolve(dirname, "src"),
      "@mocks": resolve(dirname, "mocks")
    }
  }
}))
