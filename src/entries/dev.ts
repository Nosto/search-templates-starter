import "@nosto/web-components"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { mockSearch } from "@mocks/search"
import { init, nostojs } from "@nosto/nosto-js"

// @ts-expect-error -- ENV VARIABLES --
const { MODE, VITE_MERCHANT_ID, VITE_MERCHANT_ROOT } = import.meta.env

if (VITE_MERCHANT_ROOT) {
  window.Shopify = {
    routes: {
      root: VITE_MERCHANT_ROOT
    }
  }
}

function logAnalyticsEvents() {
  const analyticsEvents = [
    "searchimpression",
    "searchclick",
    "searchaddtocart",
    "categoryimpression",
    "categoryclick",
    "categoryaddtocart"
  ] as const
  nostojs(api => {
    analyticsEvents.forEach(eventType => {
      api.listen(eventType, eventData => {
        console.info(`\x1b[32m[Nosto Analytics] Event: ${eventType}`, eventData)
      })
    })
  })
}

function renderApp() {
  if (MODE === "injected" || MODE === "mocked") {
    import("@/entries/injected.tsx")
    return
  }
  document.querySelector("#app")!.innerHTML = ""
  import("@/entries/native.tsx")
}

function setupNosto() {
  if (MODE === "mocked") {
    mockNostojs({
      pageTagging: () => ({ pageType: "search" }),
      search: mockSearch,
      recordSearchSubmit: () => Promise.resolve()
    })
    renderApp()
    return
  }

  nostojs(api => api.setTaggingProvider("pageType", "search"))
  Object.assign(window, {
    nostoab: {
      settings: {
        site: location.href,
        searchTemplatesEnabled: false
      }
    }
  })
  init({
    merchantId: VITE_MERCHANT_ID
  })
  renderApp()
  logAnalyticsEvents()
}
setupNosto()
