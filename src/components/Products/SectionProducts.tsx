import { useEffect, useState } from "preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultSize } from "@/config"

export interface SectionProductsProps {
  sectionId: string
}

interface BatchProps {
  sectionId: string
  handles: string[]
}

function Batch({ sectionId, handles }: BatchProps) {
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handles || handles.length === 0) {
      setHtml("")
      return
    }

    const fetchSectionHtml = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `/search?section_id=${encodeURIComponent(sectionId)}&q=${handles.join(":")}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch section: ${response.statusText}`)
        }

        const htmlContent = await response.text()
        setHtml(htmlContent)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch section")
        setHtml("")
      } finally {
        setLoading(false)
      }
    }

    fetchSectionHtml()
  }, [handles, sectionId])

  if (error) {
    return <div>Error loading products: {error}</div>
  }

  if (loading) {
    return <div className={style.loading} />
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default function SectionProducts({ sectionId }: SectionProductsProps) {
  const { loading: searchLoading } = useNostoAppState(state => pick(state, "loading"))
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
    <div className={cl(style.container, searchLoading && style.loading)}>
      {batches.map((batch, index) => (
        <Batch key={index} sectionId={sectionId} handles={batch} />
      ))}
    </div>
  )
}
