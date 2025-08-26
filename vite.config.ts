import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input:
        mode === "native"
          ? [resolve(__dirname, `index.html`), resolve(__dirname, `src/entries/native.tsx`)]
          : resolve(__dirname, `src/entries/injected.tsx`),
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
    environment: "jsdom"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
}))
