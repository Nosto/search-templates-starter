import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "dist",
    entry: {
      injected: resolve(__dirname, "src/entries/injected.tsx"),
      native: resolve(__dirname, "src/entries/native.tsx")
    },
    formats: ["es", "cjs"],
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, "src/index.tsx"),
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
