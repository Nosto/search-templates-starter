import { getNostoWindow, init, isNostoLoaded, nostojs } from "@nosto/nosto-js"
import { initConfig } from "../config"

export function initNosto() {
  init(initConfig)
  nostojs(api => api.setAutoLoad(false))
  const interval = setInterval(() => {
    const nostoWindow = getNostoWindow()
    if (isNostoLoaded() && nostoWindow && "reload" in nostoWindow) {
      clearInterval(interval)
      nostoWindow.reload({
        site: location.hostname,
        searchTemplatesEnabled: false
      })
    }
  }, 100)
}
