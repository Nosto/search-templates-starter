import { SearchCategories } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Category from "../Item/Category"

export type CategoriesProps = {
  categories: SearchCategories
}

export default function Categories({ categories }: CategoriesProps) {
  if (!categories?.hits?.length) {
    return null
  }

  return (
    <div
      className={
        "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0"
      }
    >
      <Heading>Categories</Heading>
      <div className={"flex flex-col"}>
        {categories.hits.map((category, index) => (
          <Category category={category} key={index} />
        ))}
      </div>
    </div>
  )
}
