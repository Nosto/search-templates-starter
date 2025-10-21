import { SearchProducts } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import Heading from "@/elements/Heading/Heading"
import Product from "@/components/Autocomplete/Product/Product"
import styles from "./Products.module.css"

export type ProductsProps = {
  products: SearchProducts
}

export default function Products({ products }: ProductsProps) {
  if (!products?.hits?.length) {
    return null
  }

  return (
    <div className={styles.productsSection}>
      <Heading>Products</Heading>
      <div className={styles.products}>
        {products.hits.map(hit => (
          <Product key={hit.productId} hit={hit} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" className={styles.submitButton}>
          See all search results
        </Button>
      </div>
    </div>
  )
}
