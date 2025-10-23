import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Product/Product"
import style from "./Results.module.css"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"

export type ProductsProps = {
  products: SearchProducts
  rovingFocus: UseRovingFocusResult
}

export default function Products({ products, rovingFocus }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className={style.productsColumn}>
      <Heading>Products</Heading>
      <div className={style.products}>
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} rovingFocus={rovingFocus} />
        ))}
      </div>
      <div className={style.button}>
        <Button type="submit" className={style.submit}>
          See all search results
        </Button>
      </div>
    </div>
  )
}
