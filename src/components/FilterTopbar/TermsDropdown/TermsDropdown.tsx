import { useState, useRef, useEffect } from "preact/hooks"
import { useFacet } from "@nosto/search-js/preact/hooks"
import { SearchTermsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "../FilterTrigger/FilterTrigger"
import Checkbox from "@/elements/Checkbox/Checkbox"

type Props = {
  facet: SearchTermsFacet
}

export default function TermsDropdown({ facet }: Props) {
  const { toggleProductFilter } = useFacet(facet)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Count selected terms
  const selectedCount = facet.data?.filter(value => value.selected).length || 0

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
    <div className="relative inline-block" ref={dropdownRef}>
      <FilterTrigger
        value={selectedCount > 0 ? `${facet.name} (${selectedCount})` : facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div
          className="absolute top-full left-0 z-[1000] min-w-[280px] max-w-[400px] bg-ns-white border-none rounded-ns-3 shadow-[0_4px_12px_rgb(0_0_0/0.15)] mt-ns-1 overflow-hidden max-md:right-0 max-md:min-w-[320px]"
          role="menu"
        >
          <div className="max-h-[300px] overflow-y-auto py-ns-2 px-0">
            {facet.data?.map(value => (
              <div key={value.value} className="p-ns-1 px-ns-4 cursor-pointer" role="menuitem">
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
