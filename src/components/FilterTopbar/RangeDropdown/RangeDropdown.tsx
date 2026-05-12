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
    const clampedMin = Math.max(min, Math.min(localMin, max))
    const clampedMax = Math.max(min, Math.min(localMax, max))
    const newMin = Math.min(clampedMin, clampedMax)
    const newMax = Math.max(clampedMin, clampedMax)

    updateRange([newMin, newMax])
    setIsOpen(false)
  }

  return (
    <div className={"relative inline-block"} ref={dropdownRef}>
      <FilterTrigger
        value={facet.name}
        isOpen={isOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ariaLabel={`Filter by ${facet.name}`}
      />

      {isOpen && (
        <div
          className={
            "absolute left-0 top-full z-[1000] mt-[var(--ns-space-1)] min-w-[300px] overflow-hidden rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] shadow-[0_4px_12px_rgb(0_0_0_/_0.15)] max-md:right-0 max-md:min-w-[280px]"
          }
          role="menu"
        >
          <div className={"flex items-center gap-[var(--ns-space-3)] p-[var(--ns-space-4)]"}>
            <div className={"flex flex-1 items-center gap-[var(--ns-space-2)]"}>
              <span
                className={
                  "text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-medium)] text-[var(--ns-color-black)]"
                }
              >
                $
              </span>
              <RangeInput
                value={localMin}
                min={min}
                max={max}
                placeholder="From"
                onChange={e => setLocalMin(Number(e.currentTarget.value))}
                className={
                  "flex-1 rounded-[var(--ns-border-radius-3)] border-0 p-[var(--ns-space-3)] text-[length:var(--ns-font-size-4)]"
                }
                aria-label={`Minimum ${facet.name}`}
              />
            </div>
            <div className={"flex flex-1 items-center gap-[var(--ns-space-2)]"}>
              <span
                className={
                  "text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-medium)] text-[var(--ns-color-black)]"
                }
              >
                $
              </span>
              <RangeInput
                value={localMax}
                min={min}
                max={max}
                placeholder="To"
                onChange={e => setLocalMax(Number(e.currentTarget.value))}
                className={
                  "flex-1 rounded-[var(--ns-border-radius-3)] border-0 p-[var(--ns-space-3)] text-[length:var(--ns-font-size-4)]"
                }
                aria-label={`Maximum ${facet.name}`}
              />
            </div>
          </div>
          <div className={"border-t-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-4)] py-[var(--ns-space-3)]"}>
            <Button onClick={applyFilter}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  )
}
