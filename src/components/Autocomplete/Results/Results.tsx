import { useResponse } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import SectionHeader from "@/elements/SectionHeader/SectionHeader"
import style from "./Results.module.css"
import Product from "@/components/Autocomplete/Product/Product"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import { SearchResponse } from "@nosto/search-js"

interface ResultsProps {
  onSubmit: (query: string) => void
}

interface KeywordsProps {
  keywords: SearchResponse["keywords"]
  onSubmit: (query: string) => void
}

function Keywords({ keywords, onSubmit }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <SectionHeader>Suggestions</SectionHeader>
      <div className={style.keywords}>
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} onSubmit={onSubmit} />
        ))}
      </div>
    </div>
  )
}

interface ProductsProps {
  products: SearchResponse["products"]
}

function Products({ products }: ProductsProps) {
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

export default function Results({ onSubmit }: ResultsProps) {
  const { keywords, products } = useResponse()

  if (!keywords?.hits?.length && !products?.hits?.length) {
    return
  }

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={`${style.container} ${style.paddingContainer}`}>
        <div className={style.items}>
          <Keywords keywords={keywords} onSubmit={onSubmit} />
          <Products products={products} />
        </div>
      </div>
    </div>
  )
}
