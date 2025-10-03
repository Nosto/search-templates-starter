import { defaultConfig, defaultProductFields, hitDecorators } from "@/config"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"
import { search } from "@nosto/search-js"
import { createStore } from "@nosto/search-js/preact/common"

export async function getInitialStore() {
  const early = getCurrentUrlState()
  if (!early.query) {
    return createStore()
  }
  const res = await search(
    {
      query: early.query,
      products: {
        size: early.size || defaultConfig.serpSize,
        filter: early.filter,
        sort: early.sort || defaultConfig.sort.value.sort,
        fields: defaultProductFields,
        facets: ["*"]
      }
    },
    {
      hitDecorators: hitDecorators
    }
  )

  return createStore({
    query: {
      query: early.query,
      products: {
        filter: early.filter
      }
    },
    response: res,
    initialized: true,
    loading: false
  })
}
