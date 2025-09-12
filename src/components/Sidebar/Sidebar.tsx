import { useFacets } from "@nosto/search-js/preact/hooks"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Sidebar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useSidebar } from "@/contexts/SidebarContext"
import SelectedFilters from "../SelectedFilters/SelectedFilters"

export const toggleButtonId = "toggle-mobile-sidebar"

type ToggleProps = {
  className?: string
  onClick?: () => void
}

function ToggleSidebarButton({ className, onClick }: ToggleProps = {}) {
  return (
    <Button className={cl(styles.close, className)} onClick={onClick}>
      <Icon name="close" />
    </Button>
  )
}

export default function SideBar() {
  const { facets } = useFacets()
  const { isOpen, setOpen } = useSidebar()

  const handleBackdropClick = () => {
    setOpen(false)
  }

  if (facets?.length === 0) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          className={styles.backdrop}
          onClick={handleBackdropClick}
          onKeyDown={e => {
            if (e.key === "Escape") {
              handleBackdropClick()
            }
          }}
          aria-label="Close sidebar filters"
        />
      )}
      <div className={cl(styles.wrapper, isOpen && styles.open)}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>Filters</span>
            <ToggleSidebarButton onClick={() => setOpen(false)} />
          </div>
          <SelectedFilters />
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
