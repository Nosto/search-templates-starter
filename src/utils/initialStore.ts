import { defaultConfig, hitDecorators } from "@/config"
import { tagging } from "@/mapping/tagging"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"
import { search } from "@nosto/search-js"
import { createStore, withDefaultQuery } from "@nosto/search-js/preact/common"

export async function getInitialStore(pageType: "category" | "search") {
  const urlParams = getCurrentUrlState()

  if (!urlParams.query && pageType === "search") {
    return createStore()
  }

  const categoryQueryAdditions =
    pageType === "category"
      ? {
          products: {
            categoryId: tagging.categoryId(),
            categoryPath: tagging.categoryPath()
          }
        }
      : {}

  const query = withDefaultQuery(pageType, {
    products: {
      ...categoryQueryAdditions,
      size: urlParams.size || defaultConfig.serpSize,
      filter: urlParams.filter,
      sort: urlParams.sort || defaultConfig.sort.value.sort
    }
  })

  const searchRequest = await search(query, {
    hitDecorators: hitDecorators
  })

  return createStore({
    query: {
      query: urlParams.query,
      products: {
        filter: urlParams.filter
      }
    },
    response: searchRequest,
    initialized: true,
    loading: false
  })
}
