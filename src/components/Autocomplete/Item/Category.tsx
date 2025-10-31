import { SearchCategory } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"

type CategoryProps = {
  category: SearchCategory
}

export default function Category({ category }: CategoryProps) {
  return (
    <a href={category.url} className={style.keyword}>
      {category.fullName ?? category.name}
    </a>
  )
}
