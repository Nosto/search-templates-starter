import "@nosto/web-components"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { mockSearch } from "@mocks/search"
import { init, nostojs } from "@nosto/nosto-js"

const { merchantId, domain, category, mode } = getContext()

type Context = {
  mode: string
  merchantId: string
  domain?: string
  category?: string
}

function getContext(): Context {
  // @ts-expect-error -- ENV VARIABLES --
  const { MODE, VITE_MERCHANT_ID, VITE_MERCHANT_DOMAIN } = import.meta.env
  const url = new URL(window.location.href)
  return {
    mode: MODE,
    merchantId: url.searchParams.get("merchant") ?? VITE_MERCHANT_ID,
    domain: url.searchParams.get("domain") ?? VITE_MERCHANT_DOMAIN,
    category: url.searchParams.get("category") ?? undefined
  }
}

if (domain) {
  window.Shopify = {
    shop: domain
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
  if (mode !== "native") {
    import("@/entries/injected.tsx")
    return
  }
  document.querySelector("#app")!.innerHTML = ""
  import("@/entries/native.tsx")
}

function setupNosto() {
  if (mode === "mocked") {
    mockNostojs({
      pageTagging: () => ({ pageType: "search" }),
      // @ts-expect-error partial mock
      pageTaggingAsync: async () => ({ pageType: "search" }),
      search: mockSearch,
      recordSearchSubmit: () => Promise.resolve()
    })
    renderApp()
    return
  }

  if (category) {
    nostojs(api => {
      api.setTaggingProvider("pageType", "category")
      api.setTaggingProvider("categories", [category])
    })
  } else {
    nostojs(api => api.setTaggingProvider("pageType", "search"))
  }

  Object.assign(window, {
    nostoab: {
      settings: {
        site: location.href,
        searchTemplatesEnabled: false
      }
    }
  })
  init({
    merchantId
  })
  renderApp()
  logAnalyticsEvents()
}
setupNosto()
