import { useState, useRef, useEffect } from "preact/hooks"
import { useRange } from "@nosto/search-js/preact/hooks"
import { SearchStatsFacet } from "@nosto/nosto-js/client"
import FilterTrigger from "../FilterTrigger/FilterTrigger"
import RangeInput from "@/elements/RangeInput/RangeInput"
import Button from "@/elements/Button/Button"

type Props = {
  facet: SearchStatsFacet
}

export default function RangeDropdown({ facet }: Props) {
  const { min, max, range, updateRange } = useRange(facet.id)
  const [isOpen, setIsOpen] = useState(false)
  const [localMin, setLocalMin] = useState(range[0])
  const [localMax, setLocalMax] = useState(range[1])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update local values when range changes
  useEffect(() => {
    setLocalMin(range[0])
    setLocalMax(range[1])
  }, [range])

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

  const applyFilter = () => {
    updateRange([localMin, localMax])
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <FilterTrigger
        value={facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div
          className="absolute top-full left-0 z-[1000] min-w-[300px] bg-ns-white border-none rounded-ns-3 shadow-[0_4px_12px_rgb(0_0_0/0.15)] mt-ns-1 overflow-hidden max-md:right-0 max-md:min-w-[280px]"
          role="menu"
        >
          <div className="flex gap-ns-3 p-ns-4 items-center">
            <div className="flex-1 flex items-center gap-ns-2">
              <span className="text-ns-4 text-ns-black font-ns-medium">$</span>
              <RangeInput
                value={localMin}
                min={min}
                max={max}
                placeholder="From"
                onChange={e => setLocalMin(Number(e.currentTarget.value))}
                className="flex-1 p-ns-3 border-none rounded-ns-3 text-ns-4"
                aria-label={`Minimum ${facet.name}`}
              />
            </div>
            <div className="flex-1 flex items-center gap-ns-2">
              <span className="text-ns-4 text-ns-black font-ns-medium">$</span>
              <RangeInput
                value={localMax}
                min={min}
                max={max}
                placeholder="To"
                onChange={e => setLocalMax(Number(e.currentTarget.value))}
                className="flex-1 p-ns-3 border-none rounded-ns-3 text-ns-4"
                aria-label={`Maximum ${facet.name}`}
              />
            </div>
          </div>
          <div className="p-ns-3 px-ns-4 border-t-0 bg-ns-grey-light">
            <Button onClick={applyFilter}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  )
}
