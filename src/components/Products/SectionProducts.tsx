import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultSize } from "@/config"
import { useFetch } from "@/hooks/useFetch"

export interface SectionProductsProps {
  sectionId: string
}

interface BatchProps {
  sectionId: string
  handles: string[]
}

function Batch({ sectionId, handles }: BatchProps) {
  const url =
    handles && handles.length > 0
      ? `/search?section_id=${encodeURIComponent(sectionId)}&q=${encodeURIComponent(handles.join(":"))}`
      : null

  const { html, loading, error } = useFetch(url)

  if (error) {
    return <div>Error loading products: {error}</div>
  }

  if (loading) {
    return <div className={style.loading} />
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default function SectionProducts({ sectionId }: SectionProductsProps) {
  const loading = useNostoAppState(state => state.loading)
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  const handles = products?.hits
    ?.map(hit => (hit as { handle?: string }).handle)
    ?.filter((handle): handle is string => !!handle)

  if (!handles || handles.length === 0) {
    return <div className={style.container} />
  }

  // Split handles into batches based on page size
  const batches: string[][] = []
  for (let i = 0; i < handles.length; i += defaultSize) {
    batches.push(handles.slice(i, i + defaultSize))
  }

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {batches.map((batch, index) => (
        <Batch key={index} sectionId={sectionId} handles={batch} />
      ))}
    </div>
  )
}
