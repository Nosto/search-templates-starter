import { useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import Product from "@/components/Autocomplete/Product/Product"

export default function Autocomplete() {
  const { products } = useDecoratedSearchResults()

  if (!products?.hits?.length) {
    return
  }

  return (
    <div
      className="absolute flex flex-col md:flex-row items-start bg-ns-white box-border ml-auto mr-auto left-0 right-0 z-ns-autocomplete max-w-ns-autocomplete border border-ns-grey-light rounded-ns-3 shadow-[2px_2px_2px_var(--ns-color-grey)] w-[calc(100%-4px)] md:w-auto"
      data-nosto-element="autocomplete"
    >
      <div className="mt-auto w-full">
        <div className="flex flex-col md:flex-row">
          {products?.hits?.length > 0 && (
            <div>
              <div className="flex flex-col flex-grow">
                {products?.hits?.map(hit => (
                  <Product key={hit.productId} hit={hit} />
                ))}
              </div>
              <div className="border-t border-ns-grey-light rounded-none flex justify-center">
                <Button type="submit" className="rounded-none text-center w-full">
                  See all search results
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
