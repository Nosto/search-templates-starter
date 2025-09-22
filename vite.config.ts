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
    setupFiles: ["./test/vitest.setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/test/e2e/**" // Exclude Playwright tests from Vitest
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
