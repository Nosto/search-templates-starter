import { useFacets } from "@nosto/search-js/preact/hooks"
import { useState, useEffect } from "preact/hooks"
import Facet from "@/components/Facet/Facet"
import RangeFacet from "@/components/Facet/RangeFacet"
import Icon from "@/elements/Icon/Icon"
import { SearchStatsFacet, SearchTermsFacet } from "@nosto/nosto-js/client"
import styles from "./Sidebar.module.css"
import Button from "@/elements/Button/Button"
import { cl } from "@nosto/search-js/utils"

export const toggleButtonId = "toggle-mobile-sidebar"

// Create a context for sidebar state management
let sidebarState: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null = null

type Props = {
  className?: string
}

type ToggleProps = Props & {
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
  const { loading, facets } = useFacets()
  const [isOpen, setIsOpen] = useState(false)

  // Store state in a module-level variable for external access
  sidebarState = { isOpen, setIsOpen }

  // Handle responsive behavior - automatically close on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check initial size

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  return facets?.length > 0 ? (
    <>
      {/* Backdrop - only show on mobile when open */}
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
      <div className={cl(styles.wrapper, loading && styles.loading, isOpen && styles.open)}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>Filters</span>
            <ToggleSidebarButton onClick={handleClose} />
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

// Export function to toggle sidebar from external components
export const toggleSidebar = () => {
  if (sidebarState) {
    sidebarState.setIsOpen(!sidebarState.isOpen)
  }
}
