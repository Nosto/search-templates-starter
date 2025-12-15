import type { Plugin } from "vite"

export function demoBasePlugin(): Plugin {
  return {
    name: "base-plugin",
    transformIndexHtml(html: string) {
      return html.replace(`<base href="/" />`, `<base href="https://nosto.github.io/search-templates-starter/demo/" />`)
    }
  }
}
