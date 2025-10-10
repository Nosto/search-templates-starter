import { build as viteBuild } from "vite"
import { makeConfig } from "@nosto/nosto-cli"
import type { Plugin } from "vite"

export default makeConfig({
  onBuild: async () => {
    await viteBuild({
      configFile: "vite.config.ts",
      mode: "injected"
    })
  },
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
