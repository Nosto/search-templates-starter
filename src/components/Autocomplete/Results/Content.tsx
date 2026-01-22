import Heading from "@/elements/Heading/Heading"
import ContentItem from "../Item/Content"
import style from "./Results.module.css"
import type { Product } from "@/types"

export type ContentProps = {
  content: Product[]
}

export default function Content({ content }: ContentProps) {
  if (!content?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <Heading>Content</Heading>
      <div className={style.keywords}>
        {content.map(item => (
          <ContentItem content={item} key={item.productId} />
        ))}
      </div>
    </div>
  )
}
