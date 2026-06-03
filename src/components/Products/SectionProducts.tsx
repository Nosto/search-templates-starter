import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultSize } from "@/config"
import { useFetch } from "@/hooks/useFetch"
import { Product } from "@/types"

/**
 * Example Shopify Liquid section compatible with Horizon theme
 *
 * Create a section file in your theme at: sections/nosto-search-results.liquid
 *
 * {% comment %}
 *   This section renders product cards from handles passed via the 'q' parameter.
 *   The handles should be colon-separated: ?q=handle-1:handle-2:handle-3
 * {% endcomment %}
 *
 * {% liquid
 *   assign handles_string = search.terms
 *   assign handles = handles_string | split: ':'
 * %}
 *
 * <div class="collection collection--no-sidebar page-width">
 *   <div class="product-grid product-grid--4-col-desktop grid grid--2-col-tablet-down">
 *     {% for handle in handles %}
 *       {% assign product = all_products[handle] %}
 *       {% if product.available %}
 *         {% render 'card-product',
 *           card_product: product,
 *           media_aspect_ratio: section.settings.image_ratio,
 *           show_secondary_image: section.settings.show_secondary_image,
 *           show_vendor: section.settings.show_vendor,
 *           show_rating: section.settings.show_rating
 *         %}
 *       {% endif %}
 *     {% endfor %}
 *   </div>
 * </div>
 *
 * {% schema %}
 * {
 *   "name": "Nosto Search Results",
 *   "settings": [
 *     {
 *       "type": "select",
 *       "id": "image_ratio",
 *       "options": [
 *         { "value": "adapt", "label": "Adapt to image" },
 *         { "value": "portrait", "label": "Portrait" },
 *         { "value": "square", "label": "Square" }
 *       ],
 *       "default": "adapt",
 *       "label": "Image ratio"
 *     },
 *     {
 *       "type": "checkbox",
 *       "id": "show_secondary_image",
 *       "default": false,
 *       "label": "Show secondary image on hover"
 *     },
 *     {
 *       "type": "checkbox",
 *       "id": "show_vendor",
 *       "default": false,
 *       "label": "Show vendor"
 *     },
 *     {
 *       "type": "checkbox",
 *       "id": "show_rating",
 *       "default": false,
 *       "label": "Show product rating"
 *     }
 *   ]
 * }
 * {% endschema %}
 *
 * Usage: <SectionProducts sectionId="nosto-search-results" />
 */

export interface SectionProductsProps {
  sectionId: string
}

export default function SectionProducts({ sectionId }: SectionProductsProps) {
  const loading = useNostoAppState(state => state.loading)
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  const handles = products.hits.map(hit => (hit as Product).handle!)

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

interface BatchProps {
  sectionId: string
  handles: string[]
}

function Batch({ sectionId, handles }: BatchProps) {
  const url = `/search?section_id=${encodeURIComponent(sectionId)}&q=${encodeURIComponent(handles.join(":"))}`

  const { html, loading, error } = useFetch(url)

  if (error) {
    return <div>Error loading products: {error}</div>
  }

  if (loading) {
    return <div className={style.loading} />
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
