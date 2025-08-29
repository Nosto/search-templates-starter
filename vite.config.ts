import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

const dirname = import.meta.dirname

export default defineConfig(() => ({
  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    lib: {
      entry: resolve(dirname, "src/entries/native.tsx"),
      name: "SearchTemplatesStarter",
      fileName: () => "index.js",
      formats: ["iife"]
    },
    rollupOptions: {
      output: {
        assetFileNames: "index[extname]"
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
      "@": resolve(dirname, "src")
    }
  }
}))
