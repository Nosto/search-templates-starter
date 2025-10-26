import { resolve } from "path"
import { defineConfig } from "vitest/config"
import { devEnvironmentPlugin } from "./src/plugins/devEnvironmentPlugin"
import preact from "@preact/preset-vite"
import { visualizer } from "rollup-plugin-visualizer"

const dirname = import.meta.dirname

export default defineConfig(({ mode = "injected" }) => {
  const plugins = [preact(), devEnvironmentPlugin()]

  // Add bundle visualizer when ANALYZE environment variable is set
  if (process.env.ANALYZE) {
    plugins.push(
      visualizer({
        filename: "build/bundle-analysis.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: "treemap"
      })
    )
  }

  return {
    build: {
      outDir: "build",
      minify: true,
      sourcemap: true,
      rollupOptions: {
        input: resolve(dirname, `src/entries/${mode}.tsx`),
        output: {
          entryFileNames: "bundle.js",
          assetFileNames: "bundle[extname]",
          banner: "(function(){",
          footer: "})();"
        }
      }
    },
    plugins,
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
  }
})
