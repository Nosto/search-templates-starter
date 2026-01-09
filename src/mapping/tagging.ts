import { nostojs } from "@nosto/nosto-js"
import { PageType } from "@nosto/nosto-js/client"

function notImplemented<T>(): T | undefined {
  throw new Error("Nosto tagging API not yet initialized")
}

export const tagging = {
  categoryId: notImplemented<string>,
  categoryPath: notImplemented<string>,
  pageType: notImplemented<PageType>,
  variation: notImplemented<string>,
  brand: notImplemented<string>
}

nostojs(api => {
  tagging.categoryId = () => api.pageTagging().categoryIds?.[0]
  tagging.categoryPath = () => api.pageTagging().categories?.[0]
  tagging.pageType = () => api.pageTagging().pageType
  tagging.variation = () => api.pageTagging().variation
  tagging.brand = () => api.pageTagging().brands?.[0]
})
