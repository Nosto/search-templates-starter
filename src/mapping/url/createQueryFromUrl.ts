import { defaultConfig } from "@/config"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"

export function createQueryFromUrl() {
  const urlState = getCurrentUrlState()

  return {
    query: urlState.query,
    products: {
      from: urlState.page ? (urlState.page - 1) * (urlState.size || defaultConfig.serpSize) : 0,
      filter: urlState.filter,
      sort: urlState.sort,
      size: urlState.size || defaultConfig.serpSize
    }
  }
}
