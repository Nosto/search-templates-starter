import { SearchCategories } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Category from "../Item/Category"
import style from "./Results.module.css"

export type CategoriesProps = {
  categories: SearchCategories
}

export default function Categories({ categories }: CategoriesProps) {
  if (!categories?.hits?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <Heading>Categories</Heading>
      <div className={style.keywords}>
        {categories.hits.map((category, index) => (
          <Category category={category} key={index} />
        ))}
      </div>
    </div>
  )
}
