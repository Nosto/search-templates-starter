import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Product/Product"

export type ProductsProps = {
  products: SearchProducts
}

export default function Products({ products }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className="flex flex-col flex-grow p-ns-1">
      <Heading>Products</Heading>
      <div className="gap-ns-2 mb-ns-2 grid grid-cols-2 grid-rows-2 [&>:nth-child(n+5)]:hidden md:grid-cols-4 md:grid-rows-auto min-[1201px]:grid-cols-5 min-[1201px]:[&>:nth-child(n+5)]:block">
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} />
        ))}
      </div>
      <div className="border-t border-ns-thin border-ns-grey-light rounded-none flex justify-center">
        <Button type="submit" className="rounded-none text-center w-full">
          See all search results
        </Button>
      </div>
    </div>
  )
}
