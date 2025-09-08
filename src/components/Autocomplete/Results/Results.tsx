import { useResponse } from "@nosto/search-js/preact/hooks"
import style from "./Results.module.css"
import Keywords from "./Keywords"
import Products from "./Products"

interface ResultsProps {
  onSubmit: (query: string) => void
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
