import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"

const dirname = import.meta.dirname

export default defineConfig(({ mode = "injected" }) => ({
  build: {
    outDir: "dist",
    minify: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(dirname, `src/entries/${mode}.tsx`),
      output: {
        entryFileNames: "index.js",
        assetFileNames: "index[extname]",
        banner: "(function(){",
        footer: "})();"
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
    setupFiles: ["./test/vitest.setup.ts"],
    include: [
      "test/{components,contexts,decorators,elements,utils}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "test/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
    ]
  },
  resolve: {
    alias: {
      "@": resolve(dirname, "src"),
      "@mocks": resolve(dirname, "mocks"),
      ".storybook": resolve(dirname, ".storybook")
    }
  }
}))
