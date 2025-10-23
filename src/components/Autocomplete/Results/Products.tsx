import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Product/Product"
import { RovingFocusGroup } from "@/components/RovingFocus/RovingFocusGroup"
import { RovingFocusItem } from "@/components/RovingFocus/RovingFocusItem"
import style from "./Results.module.css"

export type ProductsProps = {
  products: SearchProducts
}

export default function Products({ products }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className={style.productsColumn}>
      <Heading>Products</Heading>
      <RovingFocusGroup orientation="vertical" loop={true}>
        <div className={style.products}>
          {products.hits.map(hit => (
            <RovingFocusItem key={hit.productId}>
              <Product hit={hit} />
            </RovingFocusItem>
          ))}
        </div>
      </RovingFocusGroup>
      <div className={style.button}>
        <Button type="submit" className={style.submit}>
          See all search results
        </Button>
      </div>
    </div>
  )
}
