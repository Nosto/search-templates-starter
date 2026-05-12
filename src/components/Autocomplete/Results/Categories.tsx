import { SearchCategories } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Category from "../Item/Category"
import styles from "./styles"

export type CategoriesProps = {
  categories: SearchCategories
}

export default function Categories({ categories }: CategoriesProps) {
  if (!categories?.hits?.length) {
    return null
  }

  return (
    <div className={styles.suggestionsColumn}>
      <Heading>Categories</Heading>
      <div className={styles.keywords}>
        {categories.hits.map((category, index) => (
          <Category category={category} key={index} />
        ))}
      </div>
    </div>
  )
}
