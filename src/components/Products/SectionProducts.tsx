import { useEffect, useState } from "preact/hooks"
import { pick } from "@nosto/search-js/utils"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators } from "@/config"

export interface SectionProductsProps {
  sectionId: string
}

export default function SectionProducts({ sectionId }: SectionProductsProps) {
  const { loading: searchLoading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handles = products?.hits
      ?.map(hit => (hit as { handle?: string }).handle)
      ?.filter((handle): handle is string => !!handle)

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
  }, [products?.hits, sectionId])

  if (error) {
    return (
      <div className={style.container}>
        <div>Error loading products: {error}</div>
      </div>
    )
  }

  return (
    <div
      className={cl(style.container, (loading || searchLoading) && style.loading)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
