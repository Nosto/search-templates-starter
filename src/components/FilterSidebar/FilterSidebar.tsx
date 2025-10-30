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
        "border-ns-none max-w-ns-mobile-close-sidebar top-ns-4 right-ns-4 absolute block text-right items-center text-ns-3 cursor-pointer",
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
      className="fixed top-0 left-0 m-0 p-0 border-none max-w-ns-mobile-sidebar h-full max-h-full animate-[dialog-slide-in_0.3s_ease] backdrop:bg-black backdrop:opacity-50 backdrop:animate-[backdrop-fade-in_0.3s_ease]"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className="overflow-y-auto relative bg-ns-white h-full mr-0 p-ns-1 min-w-ns-mobile-sidebar flex flex-col w-full">
        <div className="flex items-baseline p-ns-4 border-b border-ns-thin border-ns-grey-light">
          <Heading>Filters</Heading>
          <ToggleSidebarButton onClick={() => setOpen(false)} />
        </div>
        <SelectedFilters />
        <div>
          <ul className="list-none p-0 m-0">
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
          <div className="mt-auto p-ns-4 border-t border-ns-thin border-ns-grey-light text-center">
            <ClearFiltersButton />
          </div>
        ) : null}
      </div>
      <style>{`
        @keyframes dialog-slide-in {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes backdrop-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }
      `}</style>
    </dialog>
  )
}
