import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Sidebar.module.css"
import Button from "@/elements/Button/Button"

export const toggleButtonId = "toggle-mobile-sidebar"

interface Props {
  className?: string
}

function ToggleSidebarButton({ className }: Props = {}) {
  return (
    <Button className={`${styles.close} ${className}`}>
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
