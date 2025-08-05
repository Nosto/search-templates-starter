import { getNostoWindow, init, isNostoLoaded, nostojs } from "@nosto/nosto-js"

export function initNosto() {
  init({
    merchantId: "shopify-10664366"
  })
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
