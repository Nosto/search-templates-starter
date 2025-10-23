import { loadEnv } from "vite"
import type { Plugin } from "vite"

export function devEnvironmentPlugin(): Plugin {
  return {
    name: "dev-environment-plugin",
    configureServer(server) {
      // Skip polluting the logs if running in Storybook
      const isStorybook = process.argv.some(arg => arg.includes("storybook"))
      if (isStorybook) {
        return
      }

      // Get the configured environment variable prefix (defaults to "VITE_" if not configured)
      const envPrefix = server.config.envPrefix || "VITE_"
      const envPrefixes = Array.isArray(envPrefix) ? envPrefix : [envPrefix]

      // Load environment variables from .env files using the configured prefix(es)
      const env = loadEnv(server.config.mode, process.cwd(), envPrefixes)

      const GREEN = "\x1b[32m"
      const YELLOW = "\x1b[33m"
      const TEAL = "\x1b[36m"
      const RESET = "\x1b[0m"

      // Find the merchant ID using any of the configured prefixes
      const merchantId = (() => {
        for (const prefix of envPrefixes) {
          const envKey = `${prefix}MERCHANT_ID`
          const id = process.env[envKey] || env[envKey]
          if (id) {
            return id
          }
        }
      })()

      if (merchantId) {
        console.log(`${GREEN}Using merchant ID: ${TEAL}${merchantId}${RESET}`)
      } else {
        console.error(
          `${YELLOW}Merchant ID environment variable is not set. The development store will not be able to connect.${RESET}`
        )
      }
    }
  }
}
