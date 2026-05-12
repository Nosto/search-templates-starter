import { useState, useRef, useEffect } from "preact/hooks"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "../FilterTrigger/FilterTrigger"
import Checkbox from "@/elements/Checkbox/Checkbox"
import { useOptimisticFacet } from "@/hooks/useOptimisticFacet"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsDropdown({ facet }: Props) {
  const { optimisticData, selectedFiltersCount, toggleProductFilter } = useOptimisticFacet(facet)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className={"relative inline-block"} ref={dropdownRef}>
      <FilterTrigger
        value={selectedFiltersCount > 0 ? `${facet.name} (${selectedFiltersCount})` : facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div
          className={
            "absolute left-0 top-full z-[1000] mt-[var(--ns-space-1)] min-w-[280px] max-w-[400px] overflow-hidden rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] shadow-[0_4px_12px_rgb(0_0_0_/_0.15)] max-md:right-0 max-md:min-w-[320px]"
          }
          role="menu"
        >
          <div className={"max-h-[300px] overflow-y-auto py-[var(--ns-space-2)]"}>
            {optimisticData.map(value => (
              <div
                key={value.value}
                className={"cursor-pointer px-[var(--ns-space-4)] py-[var(--ns-space-1)]"}
                role="menuitem"
              >
                <Checkbox
                  value={`${value.value} (${value.count})`}
                  selected={value.selected}
                  onChange={e => {
                    e.preventDefault()
                    toggleProductFilter(facet.field, value.value, !value.selected)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
