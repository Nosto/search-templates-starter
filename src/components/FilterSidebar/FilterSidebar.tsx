import { useFacets, useProductFilters } from "@nosto/search-js/preact/hooks"
import TermsFacet from "./TermsFacet/TermsFacet"
import RangeFacet from "./RangeFacet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./FilterSidebar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSidebar } from "@/contexts/SidebarContext"
import SelectedFilters from "../SelectedFilters/SelectedFilters"
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton"
import Heading from "@/elements/Heading/Heading"
import { useEffect, useRef } from "preact/hooks"

export const toggleButtonId = "toggle-mobile-sidebar"

type ToggleProps = {
  className?: string
  onClick?: () => void
}

function ToggleSidebarButton({ className, onClick }: ToggleProps = {}) {
  return (
    <Button className={cl(styles.close, className)} onClick={onClick}>
      <Icon name="close" circle={true} />
    </Button>
  )
}

export default function FilterSidebar() {
  const { facets } = useFacets()
  const { filters } = useProductFilters()
  const { isOpen, setOpen } = useFilterSidebar()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => {
      setOpen(false)
    }

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        setOpen(false)
      }
    }

    dialog.addEventListener("close", handleClose)
    dialog.addEventListener("click", handleBackdropClick)

    return () => {
      dialog.removeEventListener("close", handleClose)
      dialog.removeEventListener("click", handleBackdropClick)
    }
  }, [setOpen])

  if (facets?.length === 0) {
    return null
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading>Filters</Heading>
          <ToggleSidebarButton onClick={() => setOpen(false)} />
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
        {filters.length ? (
          <div className={styles.clearFilters}>
            <ClearFiltersButton />
          </div>
        ) : null}
      </div>
    </dialog>
  )
}
