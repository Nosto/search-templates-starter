import { nostojs } from "@nosto/nosto-js"

function notImplemented(): string | undefined {
  throw new Error("Nosto tagging API not yet initialized")
}

export const tagging = {
  categoryId: notImplemented,
  categoryPath: notImplemented,
  pageType: notImplemented,
  variation: notImplemented,
  brand: notImplemented
}

nostojs(api => {
  tagging.categoryId = () => api.pageTagging().categoryIds?.[0]
  tagging.categoryPath = () => api.pageTagging().categories?.[0]
  tagging.pageType = () => api.pageTagging().pageType
  tagging.variation = () => api.pageTagging().variation
  tagging.brand = () => api.pageTagging().brands?.[0]
})
