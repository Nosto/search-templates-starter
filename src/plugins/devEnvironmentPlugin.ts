import type { Plugin } from "vite"

export function devEnvironmentPlugin(): Plugin {
  return {
    name: "dev-environment-plugin",
    configureServer() {
      // Skip polluting the logs if running in Storybook
      const isStorybook = process.argv.some(arg => arg.includes("storybook"))
      if (isStorybook) {
        return
      }

      const GREEN = "\x1b[32m"
      const YELLOW = "\x1b[33m"
      const TEAL = "\x1b[36m"
      const RESET = "\x1b[0m"

      if (process.env.VITE_MERCHANT_ID) {
        console.log(`${GREEN}Using merchant ID: ${TEAL}${process.env.VITE_MERCHANT_ID}${RESET}`)
      } else {
        console.error(
          `${YELLOW}VITE_MERCHANT_ID environment variable is not set. The development store will not be able to connect.${RESET}`
        )
      }
    }
  }
}
