import "@nosto/web-components"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { mockSearch } from "@mocks/search"
import { init, nostojs } from "@nosto/nosto-js"
import type { BackendEnvironment } from "@nosto/nosto-js"

const environments = ["production", "staging", "local"] as const satisfies readonly BackendEnvironment[]

const { merchantId, domain, category, environment, mode } = getContext()

type Context = {
  mode: string
  merchantId: string
  domain?: string
  category?: string
  environment?: BackendEnvironment
}

function getContext(): Context {
  const { MODE, VITE_MERCHANT_ID, VITE_MERCHANT_DOMAIN, VITE_NOSTO_ENV } = import.meta.env
  const url = new URL(window.location.href)
  return {
    mode: MODE,
    merchantId: url.searchParams.get("merchant") ?? VITE_MERCHANT_ID,
    domain: url.searchParams.get("domain") ?? VITE_MERCHANT_DOMAIN,
    category: url.searchParams.get("category") ?? undefined,
    environment: parseEnvironment(url.searchParams.get("env") ?? VITE_NOSTO_ENV)
  }
}

function parseEnvironment(value: string | undefined): BackendEnvironment | undefined {
  if (!value) {
    return undefined
  }
  const environment = environments.find(candidate => candidate === value)
  if (!environment) {
    console.warn(
      `Unknown Nosto environment "${value}", falling back to production. Expected one of: ${environments.join(", ")}.`
    )
  }
  return environment
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
    merchantId,
    env: environment
  })
  renderApp()
  logAnalyticsEvents()
}
setupNosto()
