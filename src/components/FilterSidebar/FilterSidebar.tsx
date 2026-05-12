import { useFacets, useProductFilters } from "@nosto/search-js/preact/hooks"
import TermsFacet from "./TermsFacet/TermsFacet"
import RangeFacet from "./RangeFacet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"
import { useFilterSidebar } from "@/contexts/SidebarContext"
import SelectedFilters from "../SelectedFilters/SelectedFilters"
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton"
import Heading from "@/elements/Heading/Heading"
import { useCallback, useEffect, useRef } from "preact/hooks"

type ToggleProps = {
  className?: string
  onClick?: () => void
}

function ToggleSidebarButton({ className, onClick }: ToggleProps = {}) {
  return (
    <Button
      className={cl(
        "absolute right-[var(--ns-space-4)] top-[var(--ns-space-4)] block max-w-[var(--ns-width-mobile-close-sidebar)] cursor-pointer items-center border-0 text-right text-[length:var(--ns-font-size-3)]",
        className
      )}
      onClick={onClick}
    >
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

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        setOpen(false)
      }
    },
    [setOpen]
  )

  if (facets?.length === 0) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={
        "fixed left-0 top-0 m-0 h-full max-h-full max-w-[var(--ns-width-mobile-sidebar)] animate-dialog-slide-in border-0 p-0 backdrop:animate-fade-in backdrop:bg-black/50"
      }
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div
        className={
          "relative flex h-full w-full min-w-[var(--ns-width-mobile-sidebar)] flex-col overflow-y-auto bg-[var(--ns-color-white)] p-[var(--ns-space-1)]"
        }
      >
        <div className={"flex items-baseline border-b border-[var(--ns-color-grey-light)] p-[var(--ns-space-4)]"}>
          <Heading>Filters</Heading>
          <ToggleSidebarButton onClick={() => setOpen(false)} />
        </div>
        <SelectedFilters />
        <div>
          <ul className={"m-0 list-none p-0"}>
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
          <div className={"mt-auto border-t border-[var(--ns-color-grey-light)] p-[var(--ns-space-4)] text-center"}>
            <ClearFiltersButton />
          </div>
        ) : null}
      </div>
    </dialog>
  )
}
