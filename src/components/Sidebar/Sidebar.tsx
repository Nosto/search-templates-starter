import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Sidebar.module.css"
import Button from "@/elements/Button/Button"
import cl from "@/utils/cl"

type SidebarProps = {
  isVisible: boolean
  onClose: () => void
}

type ToggleButtonProps = {
  className?: string
  onClick: () => void
}

function ToggleSidebarButton({ className, onClick }: ToggleButtonProps) {
  return (
    <Button className={cl(styles.close, className)} onClick={onClick}>
      <Icon name="close" />
    </Button>
  )
}

export default function SideBar({ isVisible, onClose }: SidebarProps) {
  const { loading, facets } = useFacets()

  if (!facets?.length) {
    return null
  }

  return (
    <>
      {isVisible && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          onKeyDown={e => {
            if (e.key === "Escape") {
              onClose()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar by clicking outside"
        />
      )}
      <div className={cl(styles.wrapper, isVisible && styles.visible)} style={loading ? "opacity: 0.3;" : ""}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>Filters</span>
            <ToggleSidebarButton onClick={onClose} />
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
  )
}
