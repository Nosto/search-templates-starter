import { build as viteBuild } from "vite"
import { makeConfig } from "@nosto/nosto-cli"
import type { Plugin } from "vite"

/**
 * Nosto CLI configuration file required for communication with the `nosto` CLI tool.
 * The commands can be updated or reimplemented freely as long as they adhere to the same contracts.
 */
export default makeConfig({
  /**
   * Perform a single build and exit
   */
  onBuild: async () => {
    await viteBuild({
      configFile: "vite.config.ts",
      mode: "injected"
    })
  },
  /**
   * Build and keep watching files, exiting on user signal (Ctrl+C).
   * Should invoke onAfterBuild after each successful compile.
   */
  onBuildWatch: async ({ onAfterBuild }) => {
    await viteBuild({
      configFile: "vite.config.ts",
      mode: "injected",
      plugins: [afterBuildPlugin(onAfterBuild)],
      build: {
        watch: {
          include: ["src/**/*"],
          exclude: ["node_modules/**"]
        }
      }
    })
  }
})

function afterBuildPlugin(onAfterBuild: () => void): Plugin {
  return {
    name: "after-build-callback",
    closeBundle() {
      onAfterBuild()
    }
  }
}
