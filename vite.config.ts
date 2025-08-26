import { resolve } from "path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"
import { loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    build: {
      outDir: "dist",
      formats: ["es", "cjs"],
      minify: true,
      sourcemap: true,
      rollupOptions: {
        input: resolve(__dirname, `src/entries/${env.VITE_MODE}.tsx`),
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
      __MODE__: JSON.stringify(env.VITE_MODE)
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      },
      dedupe: ["preact", "preact/hooks"]
    }
  }
})
