import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Item/Product"

export type ProductsProps = {
  products: SearchProducts
}

export default function Products({ products }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className={"flex grow flex-col p-[var(--ns-space-1)]"}>
      <Heading>Products</Heading>
      <div
        className={
          "mb-[var(--ns-space-2)] grid grid-cols-2 grid-rows-2 gap-[var(--ns-space-2)] [&>:nth-child(n+5)]:hidden md:grid-cols-4 md:grid-rows-none min-[1201px]:grid-cols-5 min-[1201px]:[&>:nth-child(n+5)]:block"
        }
      >
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} />
        ))}
      </div>
      <div className={"flex justify-center rounded-none border-t border-[var(--ns-color-grey-light)]"}>
        <Button type="submit" className={"w-full rounded-none text-center"}>
          See all search results
        </Button>
      </div>
    </div>
  )
}
