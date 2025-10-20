import { resolve } from "path"
import { defineConfig } from "vitest/config"
import { devEnvironmentPlugin } from "./src/plugins/devEnvironmentPlugin"
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
  plugins: [preact(), devEnvironmentPlugin()],
  server: {
    port: 8000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts", "./test/msw.setup.ts"],
    exclude: ["node_modules/**", "test/e2e/**"]
  },
  resolve: {
    alias: {
      "@": resolve(dirname, "src"),
      "@mocks": resolve(dirname, "mocks"),
      ".storybook": resolve(dirname, ".storybook")
    }
  }
}))
