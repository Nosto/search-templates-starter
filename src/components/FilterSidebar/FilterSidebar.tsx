import { useFacets } from "@nosto/search-js/preact/hooks"
import TermsFacet from "./TermsFacet/TermsFacet"
import RangeFacet from "./RangeFacet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./FilterSidebar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSidebar } from "@/contexts/FilterSidebarContext"
import SelectedFilters from "../SelectedFilters/SelectedFilters"
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton"
import Heading from "@/elements/Heading/Heading"

export const toggleButtonId = "toggle-mobile-sidebar"

type ToggleProps = {
  className?: string
  onClick?: () => void
}

function ToggleFilterSidebarButton({ className, onClick }: ToggleProps = {}) {
  return (
    <Button className={cl(styles.close, className)} onClick={onClick}>
      <Icon name="close" circle={true} />
    </Button>
  )
}

export default function FilterSidebar() {
  const { facets } = useFacets()
  const { isOpen, setOpen } = useFilterSidebar()

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
            <Heading>Filters</Heading>
            <ToggleFilterSidebarButton onClick={() => setOpen(false)} />
          </div>
          <SelectedFilters />
          <div>
            <ul className={styles.facets}>
              {facets?.map(facet => {
                switch (facet.type) {
                  case "terms":
                    return <TermsFacet key={facet.id} facet={facet as SearchTermsFacet} />
                  case "stats":
                    return <RangeFacet key={facet.id} facet={facet as SearchStatsFacet} />
                  default:
                    return null
                }
              })}
            </ul>
          </div>
          <div className={styles.clearFilters}>
            <ClearFiltersButton />
          </div>
        </div>
      </div>
    </>
  )
}
