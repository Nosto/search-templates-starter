import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"
import { SubmitButton } from "../elements"
import { productImagePlaceholder } from "../../helpers"

export default function Autocomplete() {
  const { products } = useDecoratedSearchResults()

  if (!products?.hits?.length) {
    return
  }

  return (
    <div
      class="ns-autocomplete ns-absolute ns-d-flex ns-flex-column ns-flex-sm-row ns-align-items-start ns-background-white ns-border-box ns-mx-auto"
      data-nosto-element="autocomplete"
    >
      <div class="ns-w-100 ns-mt-sm-auto">
        <div class="ns-d-flex ns-flex-column ns-flex-sm-row">
          {products?.hits?.length > 0 && (
            <div class="ns-autocomplete-products ns-d-flex ns-flex-column ns-flex-grow-1">
              <div class="ns-d-flex ns-flex-column">
                {products?.hits?.map(hit => {
                  return (
                    <AutocompleteElement
                      key={hit.productId}
                      hit={{
                        productId: hit.productId!,
                        url: hit.url
                      }}
                    >
                      <div
                        data-url={hit.url}
                        class="ns-d-flex flex-row ns-clickable ns-p-2"
                        data-nosto-element="product"
                      >
                        <img
                          class="ns-h-auto ns-object-contain"
                          src={hit.imageUrl ?? productImagePlaceholder}
                          alt={hit.name}
                          width="60"
                          height="40"
                        />
                        <div class="ns-pl-2">
                          {hit.brand && <div class="ns-color-black ns-mb-1 ns-font-4">{hit.brand}</div>}
                          <div class="ns-mb-2 ns-font-4 ns-clipped ns-text-one-line">{hit.name}</div>
                          <div>
                            <span>{hit.priceText}</span>
                            {hit.listPrice && hit.price && hit.listPrice > hit.price && (
                              <span class="ns-color-black ns-font-4 ns-text-striked ns-ml-2">{hit.listPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AutocompleteElement>
                  )
                })}
              </div>
              <SubmitButton text="See all search results" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
