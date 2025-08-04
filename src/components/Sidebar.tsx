import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "./Facet"
import RangeFacet from "./RangeFacet"
import Icon from "./elements/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "../styles/components/sidebar.module.css"
import { Button } from "./elements"

export const toggleButtonId = "toggle-mobile-sidebar"

function ToggleSidebarButton({ className }: { className?: string } = {}) {
  return (
    <Button name="action" className={`${styles.close} ${className}`}>
      <label for={toggleButtonId}>
        <Icon name="close" />
      </label>
    </Button>
  )
}

export default function SideBar() {
  const { loading, facets } = useFacets()

  return facets?.length > 0 ? (
    <>
      <input type="checkbox" id={toggleButtonId} className={styles.toggle} />
      <label className={styles.backdrop} for={toggleButtonId} />
      <div className={styles.wrapper} style={loading ? "opacity: 0.3;" : ""}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>Filters</span>
            <ToggleSidebarButton />
          </div>
          <div>
            <ul className={styles.facets}>
              {facets?.map(facet => {
                switch (facet.type) {
                  case "terms":
                    return <Facet key={facet.id} facet={facet as SearchTermsFacet} />
                  case "stats":
                    return <RangeFacet key={facet.id} facet={facet as SearchStatsFacet} />
                  default:
                    return null
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  )
}
