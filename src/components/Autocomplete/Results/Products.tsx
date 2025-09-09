import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import SectionHeader from "@/elements/SectionHeader/SectionHeader"
import Product from "@/components/Autocomplete/Product/Product"
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
      <SectionHeader>Products</SectionHeader>
      <div className={style.products}>
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} />
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
