import Product from "./Product"
// import ProductWithSwatches from "./ProductWithSwatches"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"

export default function Products() {
  const { products, loading } = useNostoAppState(state => ({
    products: state.response.products,
    loading: state.loading
  }))

  return (
    <div class="ns-d-flex ns-flex-wrap" style={loading ? "opacity: 0.3;" : ""}>
      {products?.hits.map((hit, index) => {
        // Uncomment for products with swatches
        // return <ProductWithSwatches product={hit} key={hit.productId || index} />
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
